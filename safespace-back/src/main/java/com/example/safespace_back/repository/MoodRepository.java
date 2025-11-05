package com.example.safespace_back.repository;

import com.example.safespace_back.model.MoodEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MoodRepository extends JpaRepository<MoodEntity, Long> {
}
