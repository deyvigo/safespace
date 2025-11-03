package com.example.safespace_back.dto.out;

import com.example.safespace_back.model.FacultyEntity;
import com.example.safespace_back.model.RoleEntity;

import java.time.LocalDate;

public record RegisterStudentResponseDTO (
    String username,
    String name,
    String lastName,
    LocalDate birthDay,
    FacultyEntity faculty,
    RoleEntity role
) {}
