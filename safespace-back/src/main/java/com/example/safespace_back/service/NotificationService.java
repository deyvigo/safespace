package com.example.safespace_back.service;

import com.example.safespace_back.dto.out.NotificationResponseDTO;
import com.example.safespace_back.model.PsychologistEntity;

import java.util.List;

public interface NotificationService {
    List<NotificationResponseDTO> getAllPsychologyNotifications(PsychologistEntity psychologist);
}
