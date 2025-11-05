package com.example.safespace_back.service.implement;

import com.example.safespace_back.dto.in.DailyMoodRequestDTO;
import com.example.safespace_back.dto.out.DailyMoodDTO;
import com.example.safespace_back.exception.ResourceNotFoundException;
import com.example.safespace_back.mapper.DailyMoodMapper;
import com.example.safespace_back.model.DailyMoodEntity;
import com.example.safespace_back.model.MoodEntity;
import com.example.safespace_back.model.StudentEntity;
import com.example.safespace_back.model.UserEntity;
import com.example.safespace_back.repository.DailyMoodRepository;
import com.example.safespace_back.repository.MoodRepository;
import com.example.safespace_back.service.DailyMoodService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

@Service
public class DailyMoodServiceImpl implements DailyMoodService {
    private final DailyMoodRepository dailyMoodRepository;
    private final MoodRepository moodRepository;
    private final DailyMoodMapper dailyMoodMapper;

    public DailyMoodServiceImpl(
        DailyMoodRepository dailyMoodRepository,
        MoodRepository moodRepository,
        DailyMoodMapper dailyMoodMapper
    ) {
        this.dailyMoodRepository = dailyMoodRepository;
        this.moodRepository = moodRepository;
        this.dailyMoodMapper = dailyMoodMapper;
    }

    @Override
    public boolean checkIfAlreadyRegisteredDailyMoodToday(Long id) {
        DailyMoodEntity dailyMoodEntity = dailyMoodRepository.findByStudent_Id(id).orElse(null);
        return dailyMoodEntity != null;
    }

    @Override
    public DailyMoodDTO registerDailyMoodToday(DailyMoodRequestDTO dto, UserEntity user) {
        List<MoodEntity> moodEntities = moodRepository.findAllById(dto.moods());

        if (moodEntities.isEmpty()) {
           throw new ResourceNotFoundException("id_moods doesn't exist");
        }

        DailyMoodEntity dailyMoodEntity = DailyMoodEntity.builder()
            .moods(new HashSet<>(moodEntities))
            .student((StudentEntity) user)
            .description(dto.description())
            .createdAt(LocalDateTime.now())
            .build();
        return dailyMoodMapper.toDTO(dailyMoodRepository.save(dailyMoodEntity));

        // TODO: rate daily status and save on daily rate
    }
}
