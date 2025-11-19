package com.example.safespace_back.repository;

import com.example.safespace_back.model.ChatMessageEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatMessageRepository extends JpaRepository<ChatMessageEntity, Long> {
    Optional<ChatMessageEntity> findTopByChat_IdOrderByCreatedAtDesc(Long id);
    Page<ChatMessageEntity> findAllByChat_Id(Long id, Pageable pageable);
}
