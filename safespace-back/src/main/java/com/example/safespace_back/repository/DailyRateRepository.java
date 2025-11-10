package com.example.safespace_back.repository;

import com.example.safespace_back.model.DailyRateEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DailyRateRepository extends JpaRepository<DailyRateEntity, Long> {
}
