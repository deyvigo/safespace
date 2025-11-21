package com.example.safespace_back.dto.out;

import java.time.LocalDateTime;

public record DailyRateResponseDTO(
    Long id,
    double rate,
    String justification,
    LocalDateTime createdAt
) {}
