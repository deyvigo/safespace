package com.example.safespace_back.service;

import com.example.safespace_back.dto.in.DailyMoodRequestDTO;
import com.example.safespace_back.dto.out.DailyMoodCompletedDTO;
import com.example.safespace_back.dto.out.DailyMoodDTO;
import com.example.safespace_back.model.UserEntity;

import java.time.LocalDateTime;

public interface DailyMoodService {
    DailyMoodCompletedDTO checkIfAlreadyRegisteredDailyMoodToday(Long id);
    DailyMoodDTO registerDailyMoodToday(DailyMoodRequestDTO dto, LocalDateTime date, UserEntity user);
}
