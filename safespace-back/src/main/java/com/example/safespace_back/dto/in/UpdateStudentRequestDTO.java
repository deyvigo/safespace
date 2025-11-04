package com.example.safespace_back.dto.in;

import java.time.LocalDate;

public record UpdateStudentRequestDTO(
  String name,
  String lastName,
  LocalDate birthDay,
  Long idFaculty
) {}
