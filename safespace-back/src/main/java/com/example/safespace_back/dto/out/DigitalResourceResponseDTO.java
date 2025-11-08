package com.example.safespace_back.dto.out;

import com.example.safespace_back.model.CategoryDigitalResource;
import com.example.safespace_back.model.TypeDigitalResource;

public record DigitalResourceResponseDTO(
  Long id,
  String title,
  String description,
  CategoryDigitalResource category,
  TypeDigitalResource type,
  String link
) {}
