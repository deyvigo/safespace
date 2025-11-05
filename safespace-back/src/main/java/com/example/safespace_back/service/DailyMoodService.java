package com.example.safespace_back.service;

import com.example.safespace_back.dto.in.DailyMoodRequestDTO;
import com.example.safespace_back.dto.out.DailyMoodDTO;
import com.example.safespace_back.model.UserEntity;

public interface DailyMoodService {
    boolean checkIfAlreadyRegisteredDailyMoodToday(Long id);
    DailyMoodDTO registerDailyMoodToday(DailyMoodRequestDTO dto, UserEntity user);
}
