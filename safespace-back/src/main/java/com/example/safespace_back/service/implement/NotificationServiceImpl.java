package com.example.safespace_back.service.implement;

import com.example.safespace_back.dto.out.NotificationResponseDTO;
import com.example.safespace_back.mapper.NotificationMapper;
import com.example.safespace_back.model.NotificationEntity;
import com.example.safespace_back.model.PsychologistEntity;
import com.example.safespace_back.repository.NotificationRepository;
import com.example.safespace_back.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    @Override
    public List<NotificationResponseDTO> getAllPsychologyNotifications(PsychologistEntity psychologist) {
        List<NotificationEntity> notifications = notificationRepository.findAllByPsychologist_IdOrderByCreatedAtDesc(psychologist.getId());
        return notificationMapper.fromEntityListToDTOList(notifications);
    }
}
