package com.example.safespace_back.repository;

import com.example.safespace_back.model.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    List<NotificationEntity> findAllByPsychologist_IdOrderByCreatedAtDesc(Long id);
    Optional<NotificationEntity> findByStudent_Id(Long id);
}
