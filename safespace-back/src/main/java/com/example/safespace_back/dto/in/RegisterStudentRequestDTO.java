package com.example.safespace_back.dto.in;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record RegisterStudentRequestDTO (
    @NotBlank(message = "username is required")
    @Size(min = 6, message = "username must have more than 6 characters")
    String username,
    @NotBlank(message = "password is required")
    @Size(min = 6, max = 18, message = "password must be between 6 and 18 characters long")
    String password,
    @NotBlank(message = "name is required")
    String name,
    @NotBlank(message = "last_name is required")
    String lastName,
    @NotNull(message = "birth_day is required")
    @Past(message = "birth_day must be in past")
    LocalDate birthDay,
    @NotNull(message = "id_faculty is required")
    Long idFaculty
) {}
