package com.example.safespace_back.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.safespace_back.model.SessionEntity;
import com.example.safespace_back.model.SessionStatus;

public interface SessionRepository extends JpaRepository<SessionEntity, Long> {
  List<SessionEntity> findByPsychologistIdAndSessionDateTimeBetween(Long psychologistId, LocalDateTime startDate, LocalDateTime endDate);
  
  List<SessionEntity> findByStudentIdOrderBySessionDateTimeDesc(Long studentId);
  
  List<SessionEntity> findByPsychologistIdOrderBySessionDateTimeDesc(Long psychologistId);
  
  List<SessionEntity> findByPsychologistIdAndStatus(Long psychologistId, SessionStatus status);
  
  List<SessionEntity> findByStudentIdAndStatus(Long studentId, SessionStatus status);
  
  @Query("SELECT s FROM SessionEntity s WHERE s.sessionDateTime BETWEEN :start AND :end " +
         "AND (s.psychologist.id = :psychologistId OR s.student.id = :studentId) " +
         "AND s.status != 'CANCELLED'")
  List<SessionEntity> findOverlappingSessions(
      @Param("psychologistId") Long psychologistId,
      @Param("studentId") Long studentId,
      @Param("start") LocalDateTime start,
      @Param("end") LocalDateTime end
  );
  
  Optional<SessionEntity> findByIdAndStudentId(Long sessionId, Long studentId);
  
  Optional<SessionEntity> findByIdAndPsychologistId(Long sessionId, Long psychologistId);
}
