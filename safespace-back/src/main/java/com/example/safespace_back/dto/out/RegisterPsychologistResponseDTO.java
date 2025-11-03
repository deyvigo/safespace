package com.example.safespace_back.dto.out;

import com.example.safespace_back.model.RoleEntity;

import java.time.LocalDate;

public record RegisterPsychologistResponseDTO(
    String username,
    String name,
    String lastName,
    LocalDate birthDay,
    String university,
    String profession,
    RoleEntity role
) {}
