package com.example.safespace_back.controller;

import com.example.safespace_back.dto.out.DailyRateResponseDTO;
import com.example.safespace_back.model.UserEntity;
import com.example.safespace_back.service.DailyRateService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dailyrates")
@RequiredArgsConstructor
public class DailyRateController {
    private final DailyRateService dailyRateService;

    @GetMapping("/me")
    public ResponseEntity<Page<DailyRateResponseDTO>> getAllDailyRatesByUser(
        @AuthenticationPrincipal UserEntity user, Pageable pageable
    ) {
        return ResponseEntity.ok(dailyRateService.getRatesByUser(user, pageable));
    }
}
