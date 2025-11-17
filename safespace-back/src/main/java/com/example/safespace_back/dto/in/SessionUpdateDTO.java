package com.example.safespace_back.dto.in;

import com.example.safespace_back.model.SessionStatus;

import jakarta.validation.constraints.Size;

// DTO para que el psicólogo actualice una sesión
public record SessionUpdateDTO(
  SessionStatus status,
  
  @Size(max = 1000, message = "Notes must not exceed 1000 characters")
  String notePsychologist,
  
  String link, // Para sesiones online
  String location, // Para sesiones presenciales
  
  @Size(max = 500, message = "Cancellation reason must not exceed 500 characters")
  String cancellationReason
) {}
