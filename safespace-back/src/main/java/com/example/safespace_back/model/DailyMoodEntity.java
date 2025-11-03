package com.example.safespace_back.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "daily_mood")
public class DailyMoodEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_mood", nullable = false)
    private MoodEntity mood;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_student", nullable = false)
    private StudentEntity student;
}
