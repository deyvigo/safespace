package com.example.safespace_back.service;

import com.example.safespace_back.dto.in.SentenceRequestDTO;
import com.example.safespace_back.dto.out.SentenceResponseDTO;
import com.example.safespace_back.model.UserEntity;

public interface SentenceService {
    SentenceResponseDTO create(SentenceRequestDTO dto, UserEntity user);
}
