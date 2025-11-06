package com.example.safespace_back.dto.out;

public record SentenceResponseDTO (
    Long id,
    String content,
    PsychologistDTO psychologist
) {
}
