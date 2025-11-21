package com.example.safespace_back.repository;

import com.example.safespace_back.model.DailyRateEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface DailyRateRepository extends JpaRepository<DailyRateEntity, Long> {
    List<DailyRateEntity> findAllByCreatedAtBetweenAndStudent_Id(LocalDateTime start, LocalDateTime end, Long id);
    boolean existsByMood_Id(Long id);
    Page<DailyRateEntity> findAllByStudent_Id(Long id, Pageable pageable);
}
