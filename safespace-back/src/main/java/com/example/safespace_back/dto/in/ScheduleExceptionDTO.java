package com.example.safespace_back.dto.in;

import java.time.LocalDate;
import java.time.LocalTime;

import com.example.safespace_back.model.ScheduleExceptionType;

import jakarta.validation.constraints.NotNull;

public record ScheduleExceptionDTO(
  @NotNull LocalDate date,
  @NotNull ScheduleExceptionType type,

  // NOTE: Solo si type = CUSTOM_HOURS
  LocalTime startTime,
  LocalTime endTime,
  String reason
) {}
