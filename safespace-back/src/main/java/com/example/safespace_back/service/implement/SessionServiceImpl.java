package com.example.safespace_back.service.implement;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.safespace_back.dto.in.SessionRequestDTO;
import com.example.safespace_back.dto.in.SessionUpdateDTO;
import com.example.safespace_back.dto.out.SessionListDTO;
import com.example.safespace_back.dto.out.SessionResponseDTO;
import com.example.safespace_back.exception.ResourceNotFoundException;
import com.example.safespace_back.exception.UnauthorizedAccessException;
import com.example.safespace_back.mapper.SessionMapper;
import com.example.safespace_back.model.PsychologistEntity;
import com.example.safespace_back.model.SessionEntity;
import com.example.safespace_back.model.SessionStatus;
import com.example.safespace_back.model.StudentEntity;
import com.example.safespace_back.model.UserEntity;
import com.example.safespace_back.repository.PsychologistRepository;
import com.example.safespace_back.repository.SessionRepository;
import com.example.safespace_back.repository.StudentRepository;
import com.example.safespace_back.service.SessionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService {

  private final SessionRepository sessionRepository;
  private final PsychologistRepository psychologistRepository;
  private final StudentRepository studentRepository;
  private final SessionMapper sessionMapper;

  @Override
  @Transactional
  public SessionResponseDTO createSession(SessionRequestDTO dto, UserEntity currentUser) {
    if (!(currentUser instanceof StudentEntity)) {
      throw new UnauthorizedAccessException("Only students can create sessions");
    }

    StudentEntity student = studentRepository.findById(currentUser.getId())
      .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    PsychologistEntity psychologist = student.getPsychologist();
    
    // Validate that student has an assigned psychologist
    if (psychologist == null) {
      throw new IllegalStateException("Student does not have an assigned psychologist");
    }

    if (dto.sessionDateTime().isBefore(LocalDateTime.now())) {
      throw new IllegalArgumentException("Session date must be in the future");
    }

    Integer duration = dto.durationMinutes() != null ? dto.durationMinutes() : 60;
    LocalDateTime sessionEnd = dto.sessionDateTime().plusMinutes(duration);

    List<SessionEntity> overlappingSessions = sessionRepository.findOverlappingSessions(
        psychologist.getId(),
        student.getId(),
        dto.sessionDateTime(),
        sessionEnd
    );

    if (!overlappingSessions.isEmpty()) {
      throw new IllegalArgumentException("Time slot is not available");
    }

    SessionEntity session = SessionEntity.builder()
        .type(dto.type())
        .status(SessionStatus.PENDING)
        .sessionDateTime(dto.sessionDateTime())
        .durationMinutes(duration)
        .studentReason(dto.studentReason())
        .student((StudentEntity) student)
        .psychologist(psychologist)
        .build();

    SessionEntity savedSession = sessionRepository.save(session);
    return sessionMapper.toResponseDTO(savedSession);
  }

  @Override
  @Transactional
  public SessionResponseDTO updateSessionStatus(Long sessionId, SessionUpdateDTO dto, UserEntity psychologist) {
    if (!(psychologist instanceof PsychologistEntity)) {
      throw new UnauthorizedAccessException("Only psychologists can update session status");
    }

    SessionEntity session = sessionRepository.findByIdAndPsychologistId(sessionId, psychologist.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Session not found"));

    if (dto.status() != null) {
      if (session.getStatus() == SessionStatus.COMPLETED || session.getStatus() == SessionStatus.CANCELLED) {
        throw new IllegalArgumentException("Cannot update a completed or cancelled session");
      }
      session.setStatus(dto.status());
    }

    if (dto.link() != null) {
      session.setLink(dto.link());
    }

    if (dto.location() != null) {
      session.setLocation(dto.location());
    }

    if (dto.notePsychologist() != null) {
      session.setNotePsychologist(dto.notePsychologist());
    }

    SessionEntity updatedSession = sessionRepository.save(session);
    return sessionMapper.toResponseDTO(updatedSession);
  }

  @Override
  @Transactional
  public SessionResponseDTO completeSession(Long sessionId, SessionUpdateDTO dto, UserEntity psychologist) {
    if (!(psychologist instanceof PsychologistEntity)) {
      throw new UnauthorizedAccessException("Only psychologists can complete sessions");
    }
    
    SessionEntity session = sessionRepository.findByIdAndPsychologistId(sessionId, psychologist.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Session not found"));
    
    if (session.getStatus() != SessionStatus.CONFIRMED) {
      throw new IllegalArgumentException("Only confirmed sessions can be completed");
    }
    
    session.setStatus(SessionStatus.COMPLETED);
    
    if (dto.notePsychologist() != null) {
      session.setNotePsychologist(dto.notePsychologist());
    }
    
    SessionEntity updatedSession = sessionRepository.save(session);
    return sessionMapper.toResponseDTO(updatedSession);
  }

  @Override
  @Transactional
  public SessionResponseDTO cancelSession(Long sessionId, String cancellationReason, UserEntity user) {
    SessionEntity session = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new ResourceNotFoundException("Session not found"));

    boolean isStudent = session.getStudent().getId().equals(user.getId());
    boolean isPsychologist = session.getPsychologist().getId().equals(user.getId());

    if (!isStudent && !isPsychologist) {
      throw new UnauthorizedAccessException("You can only cancel your own sessions");
    }


    if (session.getStatus() == SessionStatus.COMPLETED) {
      throw new IllegalArgumentException("Cannot cancel a completed session");
    }

    if (session.getStatus() == SessionStatus.CANCELLED) {
      throw new IllegalArgumentException("Session is already cancelled");
    }


    if (isStudent) {
      LocalDateTime minCancellationTime = session.getSessionDateTime().minusHours(24);
      if (LocalDateTime.now().isAfter(minCancellationTime)) {
        throw new IllegalArgumentException("Sessions must be cancelled at least 24 hours in advance");
      }
    }

    session.setStatus(SessionStatus.CANCELLED);
    session.setCancelledAt(LocalDateTime.now());
    session.setCancellationReason(cancellationReason);

    SessionEntity updatedSession = sessionRepository.save(session);
    return sessionMapper.toResponseDTO(updatedSession);
  }

  @Override
  public SessionResponseDTO getSession(Long sessionId, UserEntity user) {
    SessionEntity session = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new ResourceNotFoundException("Session not found"));

    boolean hasAccess = session.getStudent().getId().equals(user.getId()) ||
                       session.getPsychologist().getId().equals(user.getId());

    if (!hasAccess) {
      throw new UnauthorizedAccessException("You don't have access to this session");
    }

    return sessionMapper.toResponseDTO(session);
  }

  @Override
  public List<SessionListDTO> getMySessionsAsStudent(UserEntity student) {
    if (!(student instanceof StudentEntity)) {
      throw new UnauthorizedAccessException("Only students can access this endpoint");
    }

    List<SessionEntity> sessions = sessionRepository.findByStudentIdOrderBySessionDateTimeDesc(student.getId());
    return sessions.stream()
        .map(sessionMapper::toListDTO)
        .collect(Collectors.toList());
  }

  @Override
  public List<SessionListDTO> getMySessionsAsPsychologist(UserEntity psychologist) {
    if (!(psychologist instanceof PsychologistEntity)) {
      throw new UnauthorizedAccessException("Only psychologists can access this endpoint");
    }

    List<SessionEntity> sessions = sessionRepository.findByPsychologistIdOrderBySessionDateTimeDesc(psychologist.getId());
    return sessions.stream()
        .map(sessionMapper::toListDTO)
        .collect(Collectors.toList());
  }

  @Override
  public List<SessionListDTO> getPendingRequests(UserEntity psychologist) {
    if (!(psychologist instanceof PsychologistEntity)) {
      throw new UnauthorizedAccessException("Only psychologists can access this endpoint");
    }

    List<SessionEntity> sessions = sessionRepository.findByPsychologistIdAndStatus(
        psychologist.getId(),
        SessionStatus.PENDING
    );

    return sessions.stream()
        .map(sessionMapper::toListDTO)
        .collect(Collectors.toList());
  }

  @Override
  public List<SessionListDTO> getCompletedAndConfirmedSessions(UserEntity user) {
    List<SessionStatus> statuses = List.of(SessionStatus.COMPLETED, SessionStatus.CONFIRMED);
    List<SessionEntity> sessions = sessionRepository.findByStatusInOrderBySessionDateTimeDesc(statuses);
    
    return sessions.stream()
        .map(sessionMapper::toListDTO)
        .collect(Collectors.toList());
  }
}
