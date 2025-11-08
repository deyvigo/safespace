package com.example.safespace_back.repository;

import com.example.safespace_back.model.DailyMoodEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface DailyMoodRepository extends JpaRepository<DailyMoodEntity, Long> {
    Optional<DailyMoodEntity> findByCreatedAtBetweenAndStudent_Id(LocalDateTime start, LocalDateTime end, Long id);
}
