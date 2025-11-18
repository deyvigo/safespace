package com.example.safespace_back.mapper;

import com.example.safespace_back.dto.out.MessageResponseDTO;
import com.example.safespace_back.model.ChatMessageEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ChatMessageMapper {
    @Mapping(target = "Id", source = "id")
    @Mapping(target = "chatId", source = "chat.id")
    @Mapping(target = "senderUsername", source = "sender.username")
    MessageResponseDTO fromChatMessageEntityToDTO(ChatMessageEntity chatMessageEntity);
}
