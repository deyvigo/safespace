package com.example.safespace_back.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "psychologist")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PsychologistEntity extends UserEntity {
    private String university;
    private String profession;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "psychologist")
    Set<StudentEntity> students;
}
