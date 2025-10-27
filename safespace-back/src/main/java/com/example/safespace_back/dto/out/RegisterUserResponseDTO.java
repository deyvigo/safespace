package com.example.safespace_back.dto.out;

import java.time.LocalDate;

public record RegisterUserResponseDTO(
    Long id,
    String username,
    String name,
    String lastName,
    LocalDate birthDay
) {}
