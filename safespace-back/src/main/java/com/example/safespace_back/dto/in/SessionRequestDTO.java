package com.example.safespace_back.dto.in;

import java.time.LocalDateTime;

import com.example.safespace_back.model.SessionType;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SessionRequestDTO(
  @NotNull(message = "Session type is required")
  SessionType type,
  
  @NotNull(message = "Session date and time is required")
  @Future(message = "Session must be in the future")
  LocalDateTime sessionDateTime,
  
  @NotNull(message = "Psychologist ID is required")
  Long psychologistId,
  
  @Size(max = 500, message = "Reason must not exceed 500 characters")
  String studentReason,
  
  Integer durationMinutes // Si no se especifica, usa el del schedule
) {}

