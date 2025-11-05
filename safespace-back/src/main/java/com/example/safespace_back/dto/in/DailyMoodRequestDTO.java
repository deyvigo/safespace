package com.example.safespace_back.dto.in;

import java.util.List;

public record DailyMoodRequestDTO (
    List<Long> moods,
    String description
)
{}
