package com.example.safespace_back.repository;

import com.example.safespace_back.model.SentenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SentenceRepository extends JpaRepository<SentenceEntity, Long> {
}
