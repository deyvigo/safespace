package com.example.safespace_back.model;

import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.ArrayList;
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

    private String title;
    private String description;
    private CategoryDigitalResource category;
    private TypeDigitalResource type;
    private String link;

    private boolean published = false;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "id_psychologist")
    private PsychologistEntity psychologist;

    @ManyToMany(mappedBy = "favoriteResources")
    private Set<UserEntity> favoritedBy = new HashSet<>();

    @OneToMany(mappedBy = "resourceParent", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ImageMetadataEntity> images = new ArrayList<>();
}
