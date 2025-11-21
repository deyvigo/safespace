package com.example.safespace_back.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "daily_mood")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class DailyMoodEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String description;
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_student", nullable = false)
    private StudentEntity student;

    @ManyToMany
    @JoinTable(
        name = "dailymood_moods",
        joinColumns = @JoinColumn(name = "id_daily_mood"),
        inverseJoinColumns = @JoinColumn(name = "id_mood")
    )
    private Set<MoodEntity> moods = new HashSet<>();
}
