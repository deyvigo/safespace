package com.example.safespace_back.dto.out;

import com.example.safespace_back.model.StudentEntity;
import lombok.Builder;

@Builder
public record NotificationResponseDTO (
    String message,
    String state,
    String studentName,
    String studentLastName,
    String studentUsername,
    double avgRate
) {}
