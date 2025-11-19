package com.example.safespace_back.service.implement;

import com.example.safespace_back.dto.out.ConversationResponseDTO;
import com.example.safespace_back.dto.out.MessageResponseDTO;
import com.example.safespace_back.mapper.ChatMessageMapper;
import com.example.safespace_back.model.ChatEntity;
import com.example.safespace_back.model.ChatMessageEntity;
import com.example.safespace_back.model.StudentEntity;
import com.example.safespace_back.model.UserEntity;
import com.example.safespace_back.repository.ChatMessageRepository;
import com.example.safespace_back.repository.ChatRepository;
import com.example.safespace_back.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final ChatRepository chatRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatMessageMapper chatMessageMapper;

    @Override
    public List<ConversationResponseDTO> getAllConversations(UserEntity user) {
        List<ChatEntity> chats;
        if (user instanceof StudentEntity) {
            chats = chatRepository.findAllByStudent_Id(user.getId());
        } else {
            chats = chatRepository.findAllByPsychologist_Id(user.getId());
        }

        return chats.stream()
            .map(c -> {
                Optional<ChatMessageEntity> maybeLastMessage =
                    chatMessageRepository.findTopByChat_IdOrderByCreatedAtDesc(c.getId());

                ConversationResponseDTO.ConversationResponseDTOBuilder builder = ConversationResponseDTO.builder()
                    .conversationId(c.getId());

                if (user instanceof StudentEntity) {
                    builder.name(c.getPsychologist().getName())
                        .lastName(c.getPsychologist().getLastName())
                        .username(c.getPsychologist().getUsername());
                } else {
                    builder.name(c.getStudent().getName())
                        .lastName(c.getStudent().getLastName())
                        .username(c.getStudent().getUsername());
                }

                maybeLastMessage.ifPresent(lastMessage ->
                    builder.lastMessage(chatMessageMapper.fromChatMessageEntityToDTO(lastMessage))
                );

                return builder.build();
            })
            .toList();
    }

    @Override
    public Page<MessageResponseDTO> getMessagesResponse(Pageable pageable, UserEntity user, Long conversationId) {
        Page<ChatMessageEntity> page = chatMessageRepository.findAllByChat_Id(conversationId, pageable);

        return page.map(chatMessageMapper::fromChatMessageEntityToDTO);
    }
}
