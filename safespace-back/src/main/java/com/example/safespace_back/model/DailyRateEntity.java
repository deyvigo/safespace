package com.example.safespace_back.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "daily_rate")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class DailyRateEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double rate;
    @Column(columnDefinition = "TEXT")
    private String justification;
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_student", nullable = false)
    StudentEntity student;
}
