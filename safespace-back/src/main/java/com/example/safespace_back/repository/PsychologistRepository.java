package com.example.safespace_back.repository;

import com.example.safespace_back.model.PsychologistEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PsychologistRepository extends JpaRepository<PsychologistEntity, Long> {
}
