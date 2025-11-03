package com.example.safespace_back.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "student")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StudentEntity extends UserEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_faculty")
    private FacultyEntity faculty;
}
