package com.example.safespace_back.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "digital_resource")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DigitalResourcesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String link;
    private String cover;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_psychologist")
    private PsychologistEntity psychologist;
}
