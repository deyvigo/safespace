package com.example.safespace_back.service;

import com.example.safespace_back.dto.in.MessageRequestDTO;
import com.example.safespace_back.dto.out.NotificationResponseDTO;
import com.example.safespace_back.model.PsychologistEntity;
import com.example.safespace_back.model.StudentEntity;

public interface WebSocketService {
    void sendMessage(MessageRequestDTO messageRequestDTO, PsychologistEntity psychologistEntity, StudentEntity studentEntity);
    void sendNotification(NotificationResponseDTO notificationResponseDTO, PsychologistEntity psychologist);
}
