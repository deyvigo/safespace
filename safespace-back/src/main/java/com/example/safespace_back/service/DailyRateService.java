package com.example.safespace_back.service;

import com.example.safespace_back.dto.out.DailyRateResponseDTO;
import com.example.safespace_back.model.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface DailyRateService {
    void save(DailyMoodEntity mood, LocalDateTime date);
    void checkAndSendAlertIfNeeded(StudentEntity student, LocalDateTime date);
    Page<DailyRateResponseDTO> getRatesByUser(UserEntity user, Pageable pageable);
}
