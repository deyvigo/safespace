package com.example.safespace_back.service;

import com.example.safespace_back.dto.out.ConversationResponseDTO;
import com.example.safespace_back.dto.out.MessageResponseDTO;
import com.example.safespace_back.model.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ChatService {
    List<ConversationResponseDTO> getAllConversations(UserEntity user);
    Page<MessageResponseDTO> getMessagesResponse(Pageable pageable, UserEntity user, Long conversationId);

}
