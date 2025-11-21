package com.example.safespace_back.service;

import java.time.LocalDate;
import java.util.List;

import com.example.safespace_back.dto.in.ScheduleConfigDTO;
import com.example.safespace_back.dto.in.ScheduleExceptionDTO;
import com.example.safespace_back.dto.out.PsychologistAvailabilityDTO;
import com.example.safespace_back.dto.out.TimeSlotDTO;

public interface AvailabilityService {
  List<TimeSlotDTO> getAvailableSlots(Long psychologistId, LocalDate startDate, LocalDate endDate);
  void setWeeklySchedule(Long psychologistId, List<ScheduleConfigDTO> schedules);
  void addException(Long psychologistId, ScheduleExceptionDTO exception);
  PsychologistAvailabilityDTO getPsychologistSchedule(Long psychologistId);
  void deleteSchedule(Long psychologistId, Long scheduleId);
  void deleteException(Long psychologistId, Long exceptionId);
}
