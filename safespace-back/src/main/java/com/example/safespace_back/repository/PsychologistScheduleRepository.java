package com.example.safespace_back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.safespace_back.model.PsychologistScheduleEntity;

public interface PsychologistScheduleRepository extends JpaRepository<PsychologistScheduleEntity, Long> {
  List<PsychologistScheduleEntity> findByPsychologistIdAndActiveTrue(Long psychologistId);
}
