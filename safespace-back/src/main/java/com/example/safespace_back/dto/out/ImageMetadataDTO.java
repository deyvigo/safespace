package com.example.safespace_back.dto.out;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ImageMetadataDTO (

    Long id,
    String public_URL,
    String publicID
){};
