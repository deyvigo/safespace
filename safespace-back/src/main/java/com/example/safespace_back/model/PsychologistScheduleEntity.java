package com.example.safespace_back.model;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "psychologist_schedule")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter @Getter
public class PsychologistScheduleEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "id_psychologist")
  private PsychologistEntity psychologist;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private DayOfWeek dayOfWeek;

  @Column(nullable = false)
  private LocalTime startTime;
  
  @Column(nullable = false)
  private LocalTime endTime;

  @Builder.Default
  @Column(nullable = false)
  private Integer sessionDuration = 60;

  @Builder.Default
  @Column(nullable = false)
  private Integer breakBetweenSessions = 15;

  @Builder.Default
  @Column(nullable = false)
  private Boolean active = true;

  @Column(nullable = false, updatable = false)
  @CreationTimestamp
  private LocalDateTime createdAt;

  @PrePersist
  protected void onCreate() {
    if (active == null) {
      active = true;
    }
  }
}
