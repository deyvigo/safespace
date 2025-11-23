package com.example.safespace_back.service.implement;

import com.example.safespace_back.dto.internal.AIJsonResponsesHelper;
import com.example.safespace_back.dto.internal.SentenceAIResponse;
import com.example.safespace_back.dto.out.PsychologistDTO;
import com.example.safespace_back.exception.ResourceNotFoundException;
import com.example.safespace_back.mapper.PsychologistMapper;
import com.example.safespace_back.model.DailyMoodEntity;
import com.example.safespace_back.model.PsychologistEntity;
import com.example.safespace_back.model.SentenceEntity;
import com.example.safespace_back.model.StudentEntity;
import com.example.safespace_back.repository.DailyMoodRepository;
import com.example.safespace_back.repository.PsychologistRepository;
import com.example.safespace_back.repository.SentenceRepository;
import com.example.safespace_back.service.GeminiAiService;
import com.example.safespace_back.service.StudentService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.module.ResolutionException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final SentenceRepository sentenceRepository;
    private final GeminiAiService geminiAiService;
    private final DailyMoodRepository dailyMoodRepository;
    private final PsychologistMapper psychologistMapper;
    private final PsychologistRepository psychologistRepository;

    @Override
    public List<SentenceAIResponse> getCustomSentenceByAI(StudentEntity student) {
        List<SentenceEntity> sentences = sentenceRepository.findAll();

        StringBuilder content = new StringBuilder();
        content.append("Eres un asistente de psicólogo y estás ayudando a un estudiante a sentirse mejor.\n");
        content.append("Para eso le vas a decir frases que podrían motivarlo.\n");
        content.append("Tienes un banco de posibles frases que son estas:\n");
        sentences.forEach(sentence -> content.append("- ").append(sentence.getContent()).append("\n"));
        content.append("Debes modificar las frases según el estado del usuario.\n");
        content.append("El estado del usuario es.\n");

        // get last 5 days dailymood
        LocalDateTime start = LocalDateTime.now().minusDays(5).toLocalDate().atStartOfDay();
        LocalDateTime end = LocalDateTime.now().plusDays(1).toLocalDate().atStartOfDay();
        List<DailyMoodEntity> lastMoods = dailyMoodRepository.findAllByCreatedAtBetweenAndStudent_Id(start, end, student.getId());

        lastMoods.forEach(mood -> {
            content.append(mood.getCreatedAt().toLocalDate()).append(": ");
            mood.getMoods().forEach(moodEntity -> { content.append(moodEntity.getName()).append(",");});
            content.append(mood.getDescription()).append("\n");
        });

        content.append("Genera entre 5 a 10 frases.");

        System.out.println(content.toString());

        ImmutableMap<String, Object> schema = AIJsonResponsesHelper.getSentenceSchema();

        List<SentenceAIResponse> customSentences = List.of();

        try {
            String aiResponse = geminiAiService.askSome("gemini-2.5-flash", schema, content.toString()).get();
            // TODO: add excepcionally to throw custom exception for ia operations

            ObjectMapper mapper = new ObjectMapper();
            customSentences = mapper.readValue(aiResponse, new TypeReference<List<SentenceAIResponse>>() {});
        } catch (Exception e) {
            System.err.println("Error al procesar la IA:" + e.getMessage());
        }

        return customSentences;
    }

    @Override
    @Transactional(readOnly = true)
    public PsychologistDTO getPsychologist(StudentEntity student) {
      PsychologistEntity pyschologist = psychologistRepository.findById(student.getPsychologist().getId())
        .orElseThrow(() -> new ResourceNotFoundException("Psychologist not found"));

      return psychologistMapper.toPsychologistDTO(pyschologist);
    }
}
