package com.example.safespace_back.controller;

import com.example.safespace_back.model.UserEntity;
import com.example.safespace_back.service.DailyMoodService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/dailymoods")
public class DailyMoodController {
    private final DailyMoodService dailyMoodService;

    public DailyMoodController(DailyMoodService dailyMoodService) {
        this.dailyMoodService = dailyMoodService;
    }

    @GetMapping("/check")
    public ResponseEntity<Map<String, Boolean>> checkMood(@AuthenticationPrincipal UserEntity user) {
        boolean check = dailyMoodService.checkIfAlreadyRegisteredDailyMoodToday(user.getId());
        return ResponseEntity.ok(Map.of("completed", check));
    }
}
