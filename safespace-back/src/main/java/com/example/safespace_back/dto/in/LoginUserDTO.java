package com.example.safespace_back.dto.in;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginUserDTO (
    @NotBlank(message = "username is required")
    String username,
    @NotBlank(message = "password is required")
    @Size(min = 6, max = 18, message = "password must be between 6 and 18 characters long")
    String password
) {}
