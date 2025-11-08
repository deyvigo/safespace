package com.example.safespace_back.controller;

import com.example.safespace_back.dto.in.DailyMoodRequestDTO;
import com.example.safespace_back.dto.out.DailyMoodCompletedDTO;
import com.example.safespace_back.dto.out.DailyMoodDTO;
import com.example.safespace_back.model.UserEntity;
import com.example.safespace_back.service.DailyMoodService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/dailymoods")
public class DailyMoodController {
    private final DailyMoodService dailyMoodService;

    public DailyMoodController(DailyMoodService dailyMoodService) {
        this.dailyMoodService = dailyMoodService;
    }

    @GetMapping("/check")
    public ResponseEntity<DailyMoodCompletedDTO> checkMood(@AuthenticationPrincipal UserEntity user) {
        return ResponseEntity.ok(dailyMoodService.checkIfAlreadyRegisteredDailyMoodToday(user.getId()));
    }

    @PostMapping("")
    public ResponseEntity<DailyMoodDTO> registerDailyMood(@Valid @RequestBody DailyMoodRequestDTO dto, @AuthenticationPrincipal UserEntity user) {
        return ResponseEntity.ok(dailyMoodService.registerDailyMoodToday(dto, user));
    }
}
