package com.example.safespace_back.service;

import com.example.safespace_back.model.DailyMoodEntity;
import com.example.safespace_back.model.DailyRateEntity;
import com.example.safespace_back.model.StudentEntity;

import java.time.LocalDateTime;

public interface DailyRateService {
    void save(DailyMoodEntity mood, LocalDateTime date);
    void checkAndSendAlertIfNeeded(StudentEntity student, LocalDateTime date);
}
