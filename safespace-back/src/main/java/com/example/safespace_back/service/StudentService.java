package com.example.safespace_back.service;

import java.util.List;

import com.example.safespace_back.dto.internal.RateResumeAIResponse;
import com.example.safespace_back.dto.internal.SentenceAIResponse;
import com.example.safespace_back.dto.out.PsychologistDTO;
import com.example.safespace_back.model.StudentEntity;

public interface StudentService {
    List<SentenceAIResponse> getCustomSentenceByAI(StudentEntity student);
    RateResumeAIResponse getRateWeekResume(StudentEntity student);
    PsychologistDTO getPsychologist(StudentEntity student);
}
