package com.example.safespace_back.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.safespace_back.dto.in.SessionRequestDTO;
import com.example.safespace_back.dto.in.SessionUpdateDTO;
import com.example.safespace_back.dto.out.SessionListDTO;
import com.example.safespace_back.dto.out.SessionResponseDTO;
import com.example.safespace_back.model.UserEntity;
import com.example.safespace_back.service.SessionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/sessions")
@RequiredArgsConstructor
public class SessionController {

  private final SessionService sessionService;

  @PostMapping
  @PreAuthorize("hasRole('STUDENT')")
  public ResponseEntity<SessionResponseDTO> createSession(
      @Valid @RequestBody SessionRequestDTO dto,
      @AuthenticationPrincipal UserEntity user
  ) {
    SessionResponseDTO response = sessionService.createSession(dto, user);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @GetMapping("/my-sessions")
  @PreAuthorize("hasRole('STUDENT')")
  public ResponseEntity<List<SessionListDTO>> getMySessionsAsStudent(
      @AuthenticationPrincipal UserEntity user
  ) {
    List<SessionListDTO> sessions = sessionService.getMySessionsAsStudent(user);
    return ResponseEntity.ok(sessions);
  }

  @GetMapping("/pending")
  @PreAuthorize("hasRole('PSYCHOLOGIST')")
  public ResponseEntity<List<SessionListDTO>> getPendingRequests(
      @AuthenticationPrincipal UserEntity user
  ) {
    List<SessionListDTO> sessions = sessionService.getPendingRequests(user);
    return ResponseEntity.ok(sessions);
  }

  @GetMapping("/my-appointments")
  @PreAuthorize("hasRole('PSYCHOLOGIST')")
  public ResponseEntity<List<SessionListDTO>> getMySessionsAsPsychologist(
      @AuthenticationPrincipal UserEntity user
  ) {
    List<SessionListDTO> sessions = sessionService.getMySessionsAsPsychologist(user);
    return ResponseEntity.ok(sessions);
  }

  @GetMapping("/{id}")
  public ResponseEntity<SessionResponseDTO> getSession(
      @PathVariable Long id,
      @AuthenticationPrincipal UserEntity user
  ) {
    SessionResponseDTO session = sessionService.getSession(id, user);
    return ResponseEntity.ok(session);
  }

  @PutMapping("/{id}/status")
  @PreAuthorize("hasRole('PSYCHOLOGIST')")
  public ResponseEntity<SessionResponseDTO> updateSessionStatus(
      @PathVariable Long id,
      @Valid @RequestBody SessionUpdateDTO dto,
      @AuthenticationPrincipal UserEntity user
  ) {
    SessionResponseDTO response = sessionService.updateSessionStatus(id, dto, user);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/{id}/complete")
  @PreAuthorize("hasRole('PSYCHOLOGIST')")
  public ResponseEntity<SessionResponseDTO> completeSession(
      @PathVariable Long id,
      @Valid @RequestBody SessionUpdateDTO dto,
      @AuthenticationPrincipal UserEntity user
  ) {
    SessionResponseDTO response = sessionService.completeSession(id, dto, user);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/{id}/cancel")
  public ResponseEntity<SessionResponseDTO> cancelSession(
      @PathVariable Long id,
      @RequestParam(required = false) String reason,
      @AuthenticationPrincipal UserEntity user
  ) {
    SessionResponseDTO response = sessionService.cancelSession(id, reason, user);
    return ResponseEntity.ok(response);
  }
}
