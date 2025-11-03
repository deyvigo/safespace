package com.example.safespace_back.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "session")
public class SessionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String annotations;
    private String link;
    private LocalDateTime sessionDateTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_student", nullable = false)
    private StudentEntity student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_psychologist", nullable = false)
    private PsychologistEntity psychologist;
}
