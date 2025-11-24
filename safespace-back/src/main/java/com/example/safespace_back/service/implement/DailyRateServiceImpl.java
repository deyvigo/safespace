package com.example.safespace_back.service.implement;

import com.example.safespace_back.dto.internal.AIJsonResponsesHelper;
import com.example.safespace_back.dto.internal.RateAIResponse;
import com.example.safespace_back.dto.out.DailyRateResponseDTO;
import com.example.safespace_back.dto.out.NotificationResponseDTO;
import com.example.safespace_back.mapper.DailyRateMapper;
import com.example.safespace_back.mapper.NotificationMapper;
import com.example.safespace_back.model.*;
import com.example.safespace_back.repository.DailyRateRepository;
import com.example.safespace_back.repository.NotificationRepository;
import com.example.safespace_back.service.DailyRateService;
import com.example.safespace_back.service.GeminiAiService;
import com.example.safespace_back.service.NotificationService;
import com.example.safespace_back.service.WebSocketService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DailyRateServiceImpl implements DailyRateService {
    private final DailyRateRepository dailyRateRepository;
    private final GeminiAiService geminiAiService;
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final WebSocketService webSocketService;
    private final DailyRateMapper dailyRateMapper;
    private final NotificationService notificationService;

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void save(DailyMoodEntity mood, LocalDateTime date) {
        try {
            if (dailyRateRepository.existsByMood_Id(mood.getId())) {
                return;
            }

            StringBuilder content = new StringBuilder();
            content.append("Eres un calificador de días según lo que un usuario te diga sobre su estado de ánimo y una descripción de su día si hubiera.\n");
            content.append("Debes dar una calificación del 1 al 10 y justificar esa calificación.\n");
            content.append("Estos son los rates (puedes considerar decimales entre estos rangos y la justificación escríbela como si se te dirigieras al usuario):\n");
            content.append("1 — Día terrible: El usuario expresa emociones extremas de tristeza, desesperación o agotamiento mental/físico. Nada salió bien; siente que no puede más.\n");
            content.append("2 — Muy mal: Día dominado por frustración, desánimo o problemas personales/relacionales graves. Poca o nula motivación.\n");
            content.append("3 — Mal: Día difícil, con emociones negativas frecuentes (estrés, enojo, decepción). Puede haber pequeños momentos positivos, pero el balance es malo.\n");
            content.append("4 — Regular hacia mal: Día con más cosas negativas que positivas. Se siente cansado o abrumado, aunque sin llegar a desesperarse.\n");
            content.append("5 — Neutro: Día estable, sin grandes alegrías ni problemas. Satisfactorio, pero sin entusiasmo. Sensación de rutina.\n");
            content.append("6 — Aceptable: Día mayormente tranquilo. Algunos contratiempos, pero se siente relativamente bien.\n");
            content.append("7 — Bueno: Día con varias cosas agradables o logros. Estado de ánimo general positivo, aunque no perfecto.\n");
            content.append("8 — Muy bueno: Día lleno de energía, motivación o gratitud. Pequeños problemas no afectan el ánimo.\n");
            content.append("9 — Excelente: Día sobresaliente, con felicidad, logros o experiencias significativas. Se siente muy bien consigo mismo.\n");
            content.append("10 — Perfecto: Día excepcional; todo salió bien o superó expectativas. Emoción, gratitud o euforia clara.\n");
            content.append("El usuario se siente:\n");
            mood.getMoods().forEach(m -> content.append(m.getName()).append("\n"));
            content.append(mood.getDescription());

            ImmutableMap<String, Object> schema = AIJsonResponsesHelper.getRateSchema();
            String response = geminiAiService.askSome("gemini-2.5-flash", schema, content.toString()).get();

            ObjectMapper mapper = new ObjectMapper();
            RateAIResponse aiResponse = mapper.readValue(
                response,
                new TypeReference<RateAIResponse>() {}
            );

            dailyRateRepository.save(DailyRateEntity
                .builder()
                .rate(aiResponse.rate())
                .justification(aiResponse.justification())
                .createdAt(date)
                .student(mood.getStudent())
                .mood(mood)
                .build()
            );

            checkAndSendAlertIfNeeded(mood.getStudent(), date);

        } catch (Exception e) {
            System.err.println("Error al procesar IA para dailyMoodId: " + mood.getId() + " " + e.getMessage());
        }
    }

    @Override
    public void checkAndSendAlertIfNeeded(StudentEntity student, LocalDateTime date) {
        LocalDateTime start = date.toLocalDate().minusDays(2).atStartOfDay();
        LocalDateTime end = date.toLocalDate().plusDays(1).atStartOfDay();
        List<DailyRateEntity> lastRates = dailyRateRepository.findAllByCreatedAtBetweenAndStudent_Id(start, end, student.getId());

        double avgRates = lastRates.stream()
            .mapToDouble(DailyRateEntity::getRate)
            .average()
            .orElse(0.0);

        double roundedRate = Math.round(avgRates * 100.0) / 100.0;

        String message = "Lleva un promedio de " + roundedRate + " los útimos 3 días.";

        NotificationEntity toSave = NotificationEntity
            .builder()
            .state("no leido")
            .content(message)
            .psychologist(student.getPsychologist())
            .AvgRate(roundedRate)
            .createdAt(date)
            .student(student)
            .build();

        NotificationResponseDTO notificationResponseDTO = notificationService.saveNotification(toSave);

        webSocketService.sendNotification(notificationResponseDTO, student.getPsychologist());
    }

    @Override
    public Page<DailyRateResponseDTO> getRatesByUser(UserEntity user, Pageable pageable) {
        Page<DailyRateEntity> dailyRatePage = dailyRateRepository.findAllByStudent_Id(user.getId(), pageable);
        return dailyRatePage.map(dailyRateMapper::fromEntityToDTO);
    }
}
