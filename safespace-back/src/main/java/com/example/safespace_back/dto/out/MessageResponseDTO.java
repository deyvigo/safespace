package com.example.safespace_back.dto.out;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record MessageResponseDTO (
    Long Id,
    String content,
    LocalDateTime createdAt,
    String senderUsername,
    Long chatId
) {}
