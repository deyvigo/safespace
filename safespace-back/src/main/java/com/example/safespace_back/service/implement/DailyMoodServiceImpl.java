package com.example.safespace_back.service.implement;

import com.example.safespace_back.model.DailyMoodEntity;
import com.example.safespace_back.repository.DailyMoodRepository;
import com.example.safespace_back.service.DailyMoodService;
import org.springframework.stereotype.Service;

@Service
public class DailyMoodServiceImpl implements DailyMoodService {
    private final DailyMoodRepository dailyMoodRepository;

    public DailyMoodServiceImpl(DailyMoodRepository dailyMoodRepository) {
        this.dailyMoodRepository = dailyMoodRepository;
    }

    @Override
    public boolean checkIfAlreadyRegisteredDailyMoodToday(Long id) {
        DailyMoodEntity dailyMoodEntity = dailyMoodRepository.findByStudent_Id(id).orElse(null);
        return dailyMoodEntity != null;
    }

    @Override
    public Object registerDailyMoodToday(Object dto) {
        return null;
    }
}
