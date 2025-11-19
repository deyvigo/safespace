package com.example.safespace_back.controller;

import com.example.safespace_back.dto.in.MessageRequestDTO;
import com.example.safespace_back.dto.out.ConversationResponseDTO;
import com.example.safespace_back.dto.out.MessageResponseDTO;
import com.example.safespace_back.mapper.ChatMessageMapper;
import com.example.safespace_back.model.*;
import com.example.safespace_back.repository.ChatMessageRepository;
import com.example.safespace_back.repository.ChatRepository;
import com.example.safespace_back.repository.UserRepository;
import com.example.safespace_back.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatMessageMapper chatMessageMapper;
    private final ChatService chatService;

    @Transactional
    @MessageMapping("/chat.send")
    public void sendMessage(MessageRequestDTO message, Principal principal) {
        System.out.println(message.content());
        String senderUsername = principal.getName();
        UserEntity senderUser = userRepository.findByUsername(senderUsername).orElse(null);
        UserEntity receiverUser = userRepository.findByUsername(message.receiver()).orElse(null);

        if (senderUser == null || receiverUser == null) {
            return;
        }

        StudentEntity student;
        PsychologistEntity psychologist;

        if (senderUser instanceof StudentEntity) {
            student = (StudentEntity) senderUser;
            psychologist = (PsychologistEntity) receiverUser;
        } else {
            student = (StudentEntity) receiverUser;
            psychologist = (PsychologistEntity) senderUser;
        }

        ChatEntity chat = chatRepository
            .findByStudent_IdAndPsychologist_Id(student.getId(), psychologist.getId())
            .orElseGet(() -> chatRepository.save(
                ChatEntity
                    .builder()
                    .createdAt(LocalDateTime.now())
                    .student(student)
                    .psychologist(psychologist)
                    .build()
            ));

        ChatMessageEntity chatMessage = ChatMessageEntity
            .builder()
            .chat(chat)
            .sender(senderUser)
            .createdAt(LocalDateTime.now())
            .content(message.content())
            .build();

        ChatMessageEntity saved =  chatMessageRepository.save(chatMessage);

        MessageResponseDTO messageDTO = chatMessageMapper.fromChatMessageEntityToDTO(saved);

        simpMessagingTemplate.convertAndSendToUser(
            receiverUser.getUsername(),
            "/queue/messages",
            messageDTO
        );

        simpMessagingTemplate.convertAndSendToUser(
            senderUser.getUsername(),
            "/queue/messages",
            messageDTO
        );
    }

    @GetMapping("/conversation")
    public ResponseEntity<List<ConversationResponseDTO>> getAllConversations(@AuthenticationPrincipal UserEntity user) {
        return ResponseEntity.ok(chatService.getAllConversations(user));
    }

    @GetMapping("/conversation/{idConversation}/messages")
    public ResponseEntity<Page<MessageResponseDTO>> getAllMessages(@PathVariable Long idConversation, Pageable pageable, @AuthenticationPrincipal UserEntity user) {
        return ResponseEntity.ok(chatService.getMessagesResponse(pageable, user, idConversation));
    }

    @PatchMapping("/conversation/{idConversation}")
    public ResponseEntity<Void> markConversationAsRead(@PathVariable Long idConversation, @AuthenticationPrincipal UserEntity user) {
        chatService.markLastMessagesLikeSeen(idConversation, user);
        return ResponseEntity.noContent().build();
    }
}
