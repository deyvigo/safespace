package com.example.safespace_back.controller;

import com.example.safespace_back.dto.out.NotificationResponseDTO;
import com.example.safespace_back.model.PsychologistEntity;
import com.example.safespace_back.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/psychologist")
@RequiredArgsConstructor
public class PsychologistController {
    private final NotificationService notificationService;

    @GetMapping("/me/notification")
    public ResponseEntity<List<NotificationResponseDTO>> getPsychologistNotifications(@AuthenticationPrincipal PsychologistEntity psychologist) {
        return ResponseEntity.ok(notificationService.getAllPsychologyNotifications(psychologist));
    }
}
