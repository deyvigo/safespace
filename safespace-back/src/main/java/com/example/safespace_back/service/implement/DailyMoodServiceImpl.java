package com.example.safespace_back.service.implement;

import com.example.safespace_back.dto.in.DailyMoodRequestDTO;
import com.example.safespace_back.dto.internal.RateAIResponse;
import com.example.safespace_back.dto.out.DailyMoodCompletedDTO;
import com.example.safespace_back.dto.out.DailyMoodDTO;
import com.example.safespace_back.exception.ResourceNotFoundException;
import com.example.safespace_back.mapper.DailyMoodMapper;
import com.example.safespace_back.model.*;
import com.example.safespace_back.repository.DailyMoodRepository;
import com.example.safespace_back.repository.DailyRateRepository;
import com.example.safespace_back.repository.MoodRepository;
import com.example.safespace_back.service.DailyMoodService;
import com.example.safespace_back.service.GeminiAiService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;

@Service
@RequiredArgsConstructor
public class DailyMoodServiceImpl implements DailyMoodService {
    private final DailyMoodRepository dailyMoodRepository;
    private final MoodRepository moodRepository;
    private final DailyMoodMapper dailyMoodMapper;
    private final DailyRateRepository dailyRateRepository;
    private final GeminiAiService geminiAiService;

    @Qualifier("asyncExecutor")
    private final Executor myExecutor;

    @Override
    public DailyMoodCompletedDTO checkIfAlreadyRegisteredDailyMoodToday(Long id) {
        LocalDate actualDay = LocalDateTime.now().toLocalDate();
        LocalDateTime startDate = actualDay.atTime(0, 0);
        LocalDateTime endDate = actualDay.atTime(23, 59);
        DailyMoodEntity dailyMoodEntity = dailyMoodRepository.findByCreatedAtBetweenAndStudent_Id(startDate, endDate, id).orElse(null);
        return new DailyMoodCompletedDTO(dailyMoodEntity != null);
    }

    @Override
    public DailyMoodDTO registerDailyMoodToday(DailyMoodRequestDTO dto, LocalDateTime date, UserEntity user) {
        List<MoodEntity> moodEntities = moodRepository.findAllById(dto.moods());

        if (moodEntities.isEmpty()) {
           throw new ResourceNotFoundException("id_moods doesn't exist");
        }

        DailyMoodEntity dailyMoodEntity = DailyMoodEntity.builder()
            .moods(new HashSet<>(moodEntities))
            .student((StudentEntity) user)
            .description(dto.description())
            .createdAt(date)
            .build();

        DailyMoodEntity saved = dailyMoodRepository.save(dailyMoodEntity);

        CompletableFuture.runAsync(() -> {
            try {
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
                saved.getMoods().forEach(mood -> content.append(mood.getName()).append("\n"));
                content.append(dto.description());

                ImmutableMap<String, Object> schema = ImmutableMap.of(
                "type", "object",
                    "properties", ImmutableMap.of(
                        "rate", ImmutableMap.of("type", "number"),
                        "justification", ImmutableMap.of("type", "string")
                    ),
                    "required", ImmutableList.of("rate", "justification")
                );
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
                        .student((StudentEntity) user)
                    .build()
                );
            } catch (Exception e) {
                System.err.println("Error al procesar IA para dailyMoodId=" + saved.getId() + e.getMessage());
            }
        }, myExecutor);

        return dailyMoodMapper.toDTO(saved);
    }
}
