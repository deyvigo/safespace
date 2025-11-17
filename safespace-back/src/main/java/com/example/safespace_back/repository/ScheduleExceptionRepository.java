package com.example.safespace_back.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.safespace_back.model.ScheduleExceptionEntity;

public interface ScheduleExceptionRepository extends JpaRepository<ScheduleExceptionEntity, Long> {
  List<ScheduleExceptionEntity> findByPsychologistIdAndDateBetween(Long psychologistId, LocalDate startDate, LocalDate endDate);
}
