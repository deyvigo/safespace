package com.example.safespace_back.dto.in;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record RegisterUserRequestDTO(
    @NotBlank(message = "username is required")
    String username,
    @NotBlank(message = "password is required")
    String password,
    @NotBlank(message = "name is required")
    String name,
    @NotBlank(message = "last name is required")
    String lastName,
    @NotBlank(message = "birthday is required")
    LocalDate birthDay
) {}
