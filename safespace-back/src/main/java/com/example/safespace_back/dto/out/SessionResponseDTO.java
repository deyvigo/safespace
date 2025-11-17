package com.example.safespace_back.dto.out;

import java.time.LocalDateTime;

import com.example.safespace_back.model.SessionStatus;
import com.example.safespace_back.model.SessionType;

public record SessionResponseDTO(
  Long id,
  SessionType type,
  SessionStatus status,
  LocalDateTime sessionDateTime,
  Integer durationMinutes,
  String studentReason,
  String notePsychologist,
  String link,
  String location,
  Long studentId,
  String studentName,
  Long psychologistId,
  String psychologistName,
  LocalDateTime createdAt,
  LocalDateTime cancelledAt,
  String cancellationReason
) {}
