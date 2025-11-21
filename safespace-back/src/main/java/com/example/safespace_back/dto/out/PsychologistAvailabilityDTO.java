package com.example.safespace_back.dto.out;

import java.util.List;

import com.example.safespace_back.dto.in.ScheduleConfigDTO;
import com.example.safespace_back.dto.in.ScheduleExceptionDTO;

public record PsychologistAvailabilityDTO(
  Long psychologistId,
  String psychologistName,
  List<ScheduleConfigDTO> weeklySchedule,
  List<ScheduleExceptionDTO> exceptions,
  List<TimeSlotDTO> availableSlots
) {}
