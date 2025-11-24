package com.example.safespace_back.dto.internal;

public record CloudinaryUploadResult(
        String secureUrl,
        String publicId
) {}