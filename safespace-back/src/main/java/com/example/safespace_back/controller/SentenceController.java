package com.example.safespace_back.controller;

import com.example.safespace_back.dto.in.SentenceRequestDTO;
import com.example.safespace_back.dto.out.SentenceResponseDTO;
import com.example.safespace_back.model.UserEntity;
import com.example.safespace_back.service.SentenceService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("")
    public ResponseEntity<List<SentenceResponseDTO>> findAll() {
        return ResponseEntity.ok(sentenceService.findAll());
    }

    @DeleteMapping("/{idSentence}")
    public ResponseEntity<Void> delete(@PathVariable("idSentence") Long idSentence, @AuthenticationPrincipal UserEntity user) {
        sentenceService.delete(idSentence, user);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{idSentence}")
    public ResponseEntity<SentenceResponseDTO> patch(
        @Valid @RequestBody SentenceRequestDTO dto,
        @PathVariable("idSentence") Long idSentence,
        @AuthenticationPrincipal UserEntity user
    ) {
        return ResponseEntity.ok(sentenceService.update(idSentence, dto, user));
    }
}
