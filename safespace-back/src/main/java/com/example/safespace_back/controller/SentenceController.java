package com.example.safespace_back.controller;

import com.example.safespace_back.dto.in.SentenceRequestDTO;
import com.example.safespace_back.dto.out.SentenceResponseDTO;
import com.example.safespace_back.model.UserEntity;
import com.example.safespace_back.service.SentenceService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sentences")
public class SentenceController {
    private final SentenceService sentenceService;

    public SentenceController(SentenceService sentenceService) {
        this.sentenceService = sentenceService;
    }

    @PostMapping("")
    public ResponseEntity<SentenceResponseDTO> create(@Valid @RequestBody SentenceRequestDTO dto, @AuthenticationPrincipal UserEntity user) {
        return ResponseEntity.ok(sentenceService.create(dto, user));
    }
}
