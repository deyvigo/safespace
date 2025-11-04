package com.example.safespace_back.dto.in;

import java.time.LocalDate;

public record UpdatePsychologistRequestDTO(
  String name,
  String lastName,
  LocalDate birthDay,
  String university,
  String profession
) {}
