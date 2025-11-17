package com.example.safespace_back.model;

import java.time.LocalDate;
import java.time.LocalTime;


import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "psychologist_schedule_exception")
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Builder
public class ScheduleExceptionEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "id_psychologist")
  private PsychologistEntity psychologist;

  private LocalDate date; 

  @Enumerated(EnumType.STRING)
  private ScheduleExceptionType type;

  //NOTE:  Si es CUSTOM_HOURS, usar estos campos
  private LocalTime startTime;
  private LocalTime endTime;

  private String reason;

}
