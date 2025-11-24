package com.example.safespace_back.dto.in;

import com.example.safespace_back.dto.out.ImageMetadataDTO;
import com.example.safespace_back.model.CategoryDigitalResource;
import com.example.safespace_back.model.TypeDigitalResource;
import java.util.List;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record DigitalResourceRequestDTO(
  @NotBlank(message = "title is required")
  String title,
  @NotBlank(message = "description is required")
  String description,
  @NotNull(message = "category is required")
  CategoryDigitalResource category,
  @NotNull(message = "type is required")
  TypeDigitalResource type,
  String link,
  boolean published,
  List<ImageMetadataDTO> images
) {}
