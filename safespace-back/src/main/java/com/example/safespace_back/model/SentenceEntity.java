package com.example.safespace_back.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "sentence")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class SentenceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_psychologist")
    private PsychologistEntity psychologist;
}
