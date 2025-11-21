package com.example.safespace_back.service.implement;

import com.example.safespace_back.dto.in.MessageRequestDTO;
import com.example.safespace_back.dto.out.NotificationResponseDTO;
import com.example.safespace_back.model.PsychologistEntity;
import com.example.safespace_back.model.StudentEntity;
import com.example.safespace_back.service.WebSocketService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebSocketServiceImpl implements WebSocketService {
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public void sendMessage(MessageRequestDTO messageRequestDTO, PsychologistEntity psychologistEntity, StudentEntity studentEntity) {

    }

    @Override
    public void sendNotification(NotificationResponseDTO notificationResponseDTO, PsychologistEntity psychologist) {
        simpMessagingTemplate.convertAndSendToUser(
            psychologist.getUsername(),
            "/queue/notifications",
            notificationResponseDTO
        );
    }
}
