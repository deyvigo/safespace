package com.example.safespace_back.repository;

import com.example.safespace_back.model.ChatEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<ChatEntity, Long> {
    Optional<ChatEntity> findByStudent_IdAndPsychologist_Id(Long studentId, Long psychologistId);
    List<ChatEntity> findAllByPsychologist_Id(Long id);
    List<ChatEntity> findAllByStudent_Id(Long id);
}
