package com.example.safespace_back.dto.in;

import java.time.DayOfWeek;
import java.time.LocalTime;

import jakarta.validation.constraints.NotNull;

public record ScheduleConfigDTO(
  @NotNull DayOfWeek dayOfWeek,
  @NotNull LocalTime startTime,
  @NotNull LocalTime endTime,
  Integer sessionDuration,
  Integer breakBetweenSessions
) {}
