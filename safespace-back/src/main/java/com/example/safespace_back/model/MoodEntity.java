package com.example.safespace_back.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "mood")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class MoodEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String icon;

    @ManyToMany(mappedBy = "moods")
    private Set<DailyMoodEntity> dailyMoods = new HashSet<>();
}
