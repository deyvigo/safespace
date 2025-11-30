package com.example.safespace_back.dto.out;

import java.time.LocalDateTime;

import com.example.safespace_back.model.SessionStatus;
import com.example.safespace_back.model.SessionType;

public record SessionListDTO(
  Long id,
  SessionType type,
  SessionStatus status,
  LocalDateTime sessionDateTime,
  Integer durationMinutes,
  Long studentId,
  String studentName,
  Long psychologistId,
  String psychologistName
) {}
