package com.example.safespace_back.dto.in;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;

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
    @Past(message = "birth_day must be in past")
    LocalDate birthDay
) {}
