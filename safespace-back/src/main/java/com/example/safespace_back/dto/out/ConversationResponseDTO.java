package com.example.safespace_back.dto.out;

import lombok.Builder;

@Builder
public record ConversationResponseDTO (
    Long conversationId,
    String name,
    String lastName,
    MessageResponseDTO lastMessage,
    String username
) {}
