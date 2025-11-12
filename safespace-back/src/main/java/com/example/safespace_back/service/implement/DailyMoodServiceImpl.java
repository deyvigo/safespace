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
import com.example.safespace_back.service.DailyRateService;
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
    private final DailyRateService dailyRateService;

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

        dailyRateService.save(saved, date);

        return dailyMoodMapper.toDTO(saved);
    }
}
