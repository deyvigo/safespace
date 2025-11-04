package com.example.safespace_back.dto.out;

import java.time.LocalDate;

public record StudentDTO(
  String username,
  String name,
  String lastName,
  LocalDate birthDay,
  FacultyDTO faculty
) {}
