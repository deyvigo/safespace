package com.example.safespace_back.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "psychologist")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PsychologistEntity extends UserEntity {
    private String university;
    private String profession;
}
