package com.example.safespace_back.service.implement;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.safespace_back.dto.in.ScheduleConfigDTO;
import com.example.safespace_back.dto.in.ScheduleExceptionDTO;
import com.example.safespace_back.dto.out.PsychologistAvailabilityDTO;
import com.example.safespace_back.dto.out.TimeSlotDTO;
import com.example.safespace_back.exception.ResourceNotFoundException;
import com.example.safespace_back.exception.UnauthorizedAccessException;
import com.example.safespace_back.model.PsychologistEntity;
import com.example.safespace_back.model.PsychologistScheduleEntity;
import com.example.safespace_back.model.ScheduleExceptionEntity;
import com.example.safespace_back.model.ScheduleExceptionType;
import com.example.safespace_back.model.SessionEntity;
import com.example.safespace_back.repository.PsychologistRepository;
import com.example.safespace_back.repository.PsychologistScheduleRepository;
import com.example.safespace_back.repository.ScheduleExceptionRepository;
import com.example.safespace_back.repository.SessionRepository;
import com.example.safespace_back.service.AvailabilityService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AvailabilityServiceImpl implements AvailabilityService {

  private final PsychologistScheduleRepository scheduleRepository;
  private final ScheduleExceptionRepository exceptionRepository;
  private final SessionRepository sessionRepository;
  private final PsychologistRepository psychologistRepository;

  @Override
  public List<TimeSlotDTO> getAvailableSlots(
      Long psychologistId, 
      LocalDate startDate, 
      LocalDate endDate
  ) {
    List<TimeSlotDTO> availableSlots = new ArrayList<>();

    List<PsychologistScheduleEntity> schedules =
      scheduleRepository.findByPsychologistIdAndActiveTrue(psychologistId);

    List<ScheduleExceptionEntity> exceptions = 
      exceptionRepository.findByPsychologistIdAndDateBetween(psychologistId, startDate, endDate);

    List<SessionEntity> bookedSessions = 
      sessionRepository.findByPsychologistIdAndSessionDateTimeBetween(
        psychologistId, 
        startDate.atStartOfDay(), 
        endDate.atTime(23, 59)
      );

    LocalDate currentDate = startDate;
    while (!currentDate.isAfter(endDate)) {
      DayOfWeek dayOfWeek = currentDate.getDayOfWeek();

      ScheduleExceptionEntity exception = findExceptionForDate(exceptions, currentDate);

      if (exception != null && exception.getType() == ScheduleExceptionType.BLOCKED) {
        currentDate = currentDate.plusDays(1);
        continue;
      }

      PsychologistScheduleEntity schedule;
      if (exception != null && exception.getType() == ScheduleExceptionType.CUSTOM_HOURS) {
        schedule = createScheduleFromException(exception);
      } else {
        schedule = findScheduleForDay(schedules, dayOfWeek);
      }

      if (schedule != null) {
        List<TimeSlotDTO> daySlots = generateSlotsForDay(
          currentDate,
          schedule,
          bookedSessions
        );
        availableSlots.addAll(daySlots);
      }

      currentDate = currentDate.plusDays(1);
    }

    return availableSlots;
  }

  private ScheduleExceptionEntity findExceptionForDate(List<ScheduleExceptionEntity> exceptions, LocalDate currentDate) {
    return exceptions.stream()
      .filter(ex -> ex.getDate().equals(currentDate))
      .findFirst()
      .orElse(null);
  }

  private PsychologistScheduleEntity createScheduleFromException(ScheduleExceptionEntity exception) {
    return PsychologistScheduleEntity.builder()
      .psychologist(exception.getPsychologist())
      .dayOfWeek(exception.getDate().getDayOfWeek())
      .startTime(exception.getStartTime())
      .endTime(exception.getEndTime())
      .active(true)
      .build();
  }

  private PsychologistScheduleEntity findScheduleForDay(List<PsychologistScheduleEntity> schedules, DayOfWeek dayOfWeek) {
    return schedules.stream()
      .filter(sc -> sc.getDayOfWeek().equals(dayOfWeek))
      .findFirst()
      .orElse(null);
  }

  private List<TimeSlotDTO> generateSlotsForDay(
    LocalDate date,
    PsychologistScheduleEntity schedule,
    List<SessionEntity> bookedSessions
  ) {
    List<TimeSlotDTO> slots = new ArrayList<>();
    LocalTime currentTime = schedule.getStartTime();

    while (currentTime.plusMinutes(schedule.getSessionDuration())
        .isBefore(schedule.getEndTime()) || 
        currentTime.plusMinutes(schedule.getSessionDuration())
        .equals(schedule.getEndTime())
    ) {
        LocalDateTime slotStart = LocalDateTime.of(date, currentTime);
        LocalDateTime slotEnd = slotStart.plusMinutes(schedule.getSessionDuration());

        boolean isAvailable = bookedSessions.stream()
          .noneMatch(session -> {
              // Usar la duración guardada en la sesión, no la del schedule
              LocalDateTime sessionEnd = session.getSessionDateTime()
                  .plusMinutes(session.getDurationMinutes() != null ? session.getDurationMinutes() : 60);
              return isOverlapping(
                  session.getSessionDateTime(), 
                  sessionEnd,
                  slotStart,
                  slotEnd);
          });

        if (isAvailable) {
          slots.add(new TimeSlotDTO(slotStart, slotEnd, schedule.getSessionDuration()));
        }

        currentTime = currentTime
            .plusMinutes(schedule.getSessionDuration())
            .plusMinutes(schedule.getBreakBetweenSessions());
    }

    return slots;
  }

  private boolean isOverlapping(
    LocalDateTime start1, LocalDateTime end1,
    LocalDateTime start2, LocalDateTime end2
  ) {
    return start1.isBefore(end2) && end1.isAfter(start2);
  }

  @Override
  @Transactional
  public void setWeeklySchedule(Long psychologistId, List<ScheduleConfigDTO> schedules) {
    PsychologistEntity psychologist = psychologistRepository.findById(psychologistId)
        .orElseThrow(() -> new ResourceNotFoundException("Psychologist not found"));
    
    List<PsychologistScheduleEntity> existingSchedules = 
        scheduleRepository.findByPsychologistIdAndActiveTrue(psychologistId);
    existingSchedules.forEach(schedule -> schedule.setActive(false));
    scheduleRepository.saveAll(existingSchedules);

    List<PsychologistScheduleEntity> newSchedules = schedules.stream()
        .map(dto -> PsychologistScheduleEntity.builder()
            .psychologist(psychologist)
            .dayOfWeek(dto.dayOfWeek())
            .startTime(dto.startTime())
            .endTime(dto.endTime())
            .sessionDuration(dto.sessionDuration() != null ? dto.sessionDuration() : 60)
            .breakBetweenSessions(dto.breakBetweenSessions() != null ? dto.breakBetweenSessions() : 15)
            .active(true)
            .build())
        .collect(Collectors.toList());
    
    scheduleRepository.saveAll(newSchedules);
  }

  @Override
  @Transactional
  public void addException(Long psychologistId, ScheduleExceptionDTO exceptionDTO) {
    PsychologistEntity psychologist = psychologistRepository.findById(psychologistId)
        .orElseThrow(() -> new ResourceNotFoundException("Psychologist not found"));
    
    if (exceptionDTO.type() == ScheduleExceptionType.CUSTOM_HOURS) {
      if (exceptionDTO.startTime() == null || exceptionDTO.endTime() == null) {
        throw new IllegalArgumentException("CUSTOM_HOURS requires startTime and endTime");
      }
    }
    
    ScheduleExceptionEntity exception = ScheduleExceptionEntity.builder()
        .psychologist(psychologist)
        .date(exceptionDTO.date())
        .type(exceptionDTO.type())
        .startTime(exceptionDTO.startTime())
        .endTime(exceptionDTO.endTime())
        .reason(exceptionDTO.reason())
        .build();
    
    exceptionRepository.save(exception);
  }

  @Override
  public PsychologistAvailabilityDTO getPsychologistSchedule(Long psychologistId) {
    PsychologistEntity psychologist = psychologistRepository.findById(psychologistId)
        .orElseThrow(() -> new ResourceNotFoundException("Psychologist not found"));
    
    List<PsychologistScheduleEntity> schedules = 
        scheduleRepository.findByPsychologistIdAndActiveTrue(psychologistId);
    
    LocalDate today = LocalDate.now();
    LocalDate futureDate = today.plusDays(90);
    List<ScheduleExceptionEntity> exceptions = 
        exceptionRepository.findByPsychologistIdAndDateBetween(psychologistId, today, futureDate);
    
    List<ScheduleConfigDTO> scheduleDTOs = schedules.stream()
        .map(s -> new ScheduleConfigDTO(
            s.getDayOfWeek(),
            s.getStartTime(),
            s.getEndTime(),
            s.getSessionDuration(),
            s.getBreakBetweenSessions()))
        .collect(Collectors.toList());
    
    List<ScheduleExceptionDTO> exceptionDTOs = exceptions.stream()
        .map(e -> new ScheduleExceptionDTO(
            e.getDate(),
            e.getType(),
            e.getStartTime(),
            e.getEndTime(),
            e.getReason()))
        .collect(Collectors.toList());
    
    LocalDate endDate = today.plusDays(30);
    List<TimeSlotDTO> availableSlots = getAvailableSlots(psychologistId, today, endDate);
    
    String psychologistName = psychologist.getName() + " " + psychologist.getLastName();
    
    return new PsychologistAvailabilityDTO(
        psychologistId,
        psychologistName,
        scheduleDTOs,
        exceptionDTOs,
        availableSlots
    );
  }

  @Override
  @Transactional
  public void deleteSchedule(Long psychologistId, Long scheduleId) {
    PsychologistScheduleEntity schedule = scheduleRepository.findById(scheduleId)
        .orElseThrow(() -> new ResourceNotFoundException("Schedule not found"));
    
    if (!schedule.getPsychologist().getId().equals(psychologistId)) {
      throw new UnauthorizedAccessException("You can only delete your own schedules");
    }
    
    // Desactivar en lugar de eliminar (soft delete)
    schedule.setActive(false);
    scheduleRepository.save(schedule);
  }

  @Override
  @Transactional
  public void deleteException(Long psychologistId, Long exceptionId) {
    ScheduleExceptionEntity exception = exceptionRepository.findById(exceptionId)
        .orElseThrow(() -> new ResourceNotFoundException("Exception not found"));
    
    if (!exception.getPsychologist().getId().equals(psychologistId)) {
      throw new UnauthorizedAccessException("You can only delete your own exceptions");
    }
    
    exceptionRepository.delete(exception);
  }
}
