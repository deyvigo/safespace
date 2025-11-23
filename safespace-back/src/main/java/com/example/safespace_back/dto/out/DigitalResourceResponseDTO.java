package com.example.safespace_back.dto.out;

import com.example.safespace_back.model.CategoryDigitalResource;
import com.example.safespace_back.model.TypeDigitalResource;

import java.util.List;

public record DigitalResourceResponseDTO(
  Long id,
  String title,
  String description,
  CategoryDigitalResource category,
  TypeDigitalResource type,
  String link,
  List<ImageMetadataDTO> images
) {}
