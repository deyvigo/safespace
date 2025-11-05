package com.example.safespace_back.dto.out;

import java.time.LocalDateTime;
import java.util.Set;

public record DailyMoodDTO (
   Set<MoodDTO> moods,
   Long id,
   String description,
   LocalDateTime createdAt
) {}
