package com.example.safespace_back.dto.out;

public record JwtDTO(
    String token,
    String refreshToken
) {}
