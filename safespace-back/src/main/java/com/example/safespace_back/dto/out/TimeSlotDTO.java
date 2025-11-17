package com.example.safespace_back.dto.out;

import java.time.LocalDateTime;

public record TimeSlotDTO(
  LocalDateTime startDateTime,
  LocalDateTime endDateTime,
  Integer durationMinutes
) {}
