package com.example.safespace_back.dto.in;

public record MessageRequestDTO(
    Long conversationId,
    String content,
    String receiver
) {}
