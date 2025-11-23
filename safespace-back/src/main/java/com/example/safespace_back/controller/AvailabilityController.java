package com.example.safespace_back.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.safespace_back.dto.in.ScheduleConfigDTO;
import com.example.safespace_back.dto.in.ScheduleExceptionDTO;
import com.example.safespace_back.dto.out.PsychologistAvailabilityDTO;
import com.example.safespace_back.dto.out.TimeSlotDTO;
import com.example.safespace_back.model.StudentEntity;
import com.example.safespace_back.model.UserEntity;
import com.example.safespace_back.service.AvailabilityService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/availability")
@RequiredArgsConstructor
public class AvailabilityController {

  private final AvailabilityService availabilityService;

  @PostMapping("/schedule")
  public ResponseEntity<Void> setWeeklySchedule(
    @Valid @RequestBody List<ScheduleConfigDTO> schedules,
    @AuthenticationPrincipal UserEntity user
  ) {
    availabilityService.setWeeklySchedule(user.getId(), schedules);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/exceptions")
  public ResponseEntity<Void> addException(
    @Valid @RequestBody ScheduleExceptionDTO exception,
    @AuthenticationPrincipal UserEntity user
  ) {
    availabilityService.addException(user.getId(), exception);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/my-schedule")
  public ResponseEntity<PsychologistAvailabilityDTO> getMySchedule(
      @AuthenticationPrincipal UserEntity user
  ) {
    PsychologistAvailabilityDTO availability = availabilityService.getPsychologistSchedule(user.getId());
    return ResponseEntity.ok(availability);
  }

  @DeleteMapping("/schedule/{scheduleId}")
  public ResponseEntity<Void> deleteSchedule(
    @PathVariable Long scheduleId,
    @AuthenticationPrincipal UserEntity user
  ) {
    availabilityService.deleteSchedule(user.getId(), scheduleId);
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/exceptions/{exceptionId}")
  public ResponseEntity<Void> deleteException(
    @PathVariable Long exceptionId,
    @AuthenticationPrincipal UserEntity user
  ) {
    availabilityService.deleteException(user.getId(), exceptionId);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/psychologist/{id}/slots")
  public ResponseEntity<List<TimeSlotDTO>> getAvailableSlots(
    @PathVariable Long id,
    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
  ) {
    List<TimeSlotDTO> slots = availabilityService.getAvailableSlots(id, startDate, endDate);
    return ResponseEntity.ok(slots);
  }

  @GetMapping("/psychologist/{id}")
  public ResponseEntity<PsychologistAvailabilityDTO> getPsychologistSchedule(
    @PathVariable Long id
  ) {
    PsychologistAvailabilityDTO availability = availabilityService.getPsychologistSchedule(id);
    return ResponseEntity.ok(availability);
  }

  @GetMapping("/my-psychologist/slots")
  public ResponseEntity<List<TimeSlotDTO>> getMyPsychologistAvailableSlots(
    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
    @AuthenticationPrincipal UserEntity user
  ) {
    if (!(user instanceof StudentEntity)) {
      throw new IllegalStateException("Only students can access this endpoint");
    }
    StudentEntity student = (StudentEntity) user;
    if (student.getPsychologist() == null) {
      throw new IllegalStateException("Student does not have an assigned psychologist");
    }
    Long psychologistId = student.getPsychologist().getId();
    List<TimeSlotDTO> slots = availabilityService.getAvailableSlots(psychologistId, startDate, endDate);
    return ResponseEntity.ok(slots);
  }

  @GetMapping("/my-psychologist")
  public ResponseEntity<PsychologistAvailabilityDTO> getMyPsychologistSchedule(
    @AuthenticationPrincipal UserEntity user
  ) {
    if (!(user instanceof StudentEntity)) {
      throw new IllegalStateException("Only students can access this endpoint");
    }
    StudentEntity student = (StudentEntity) user;
    if (student.getPsychologist() == null) {
      throw new IllegalStateException("Student does not have an assigned psychologist");
    }
    Long psychologistId = student.getPsychologist().getId();
    PsychologistAvailabilityDTO availability = availabilityService.getPsychologistSchedule(psychologistId);
    return ResponseEntity.ok(availability);
  }
}
