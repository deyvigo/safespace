package com.example.safespace_back.service;

import com.example.safespace_back.dto.internal.SentenceAIResponse;
import com.example.safespace_back.model.StudentEntity;

import java.util.List;

public interface StudentService {
    List<SentenceAIResponse> getCustomSentenceByAI(StudentEntity student);
}
