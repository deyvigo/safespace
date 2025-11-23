package com.example.safespace_back.controller;

import com.example.safespace_back.dto.internal.SentenceAIResponse;
import com.example.safespace_back.dto.internal.RateResumeAIResponse;
import com.example.safespace_back.dto.out.PsychologistDTO;
import com.example.safespace_back.mapper.PsychologistMapper;
import com.example.safespace_back.model.StudentEntity;
import com.example.safespace_back.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @GetMapping("/me/sentences")
    public ResponseEntity<List<SentenceAIResponse>> getCustomSentences(@AuthenticationPrincipal StudentEntity student) {
        return ResponseEntity.ok(studentService.getCustomSentenceByAI(student));
    }
    @GetMapping("/me/resume")
    public ResponseEntity<RateResumeAIResponse> getWeekResume(@AuthenticationPrincipal StudentEntity student) {
        return ResponseEntity.ok(studentService.getRateWeekResume(student));
    }

    @GetMapping("/me/psychologist")
    public ResponseEntity<PsychologistDTO> getMyPsychologist(
      @AuthenticationPrincipal StudentEntity student
    ) {
        PsychologistDTO dto = studentService.getPsychologist(student);
        return ResponseEntity.ok(dto);
    }
}
