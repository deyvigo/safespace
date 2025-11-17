package com.example.safespace_back.service;

import java.util.List;

import com.example.safespace_back.dto.in.SessionRequestDTO;
import com.example.safespace_back.dto.in.SessionUpdateDTO;
import com.example.safespace_back.dto.out.SessionListDTO;
import com.example.safespace_back.dto.out.SessionResponseDTO;
import com.example.safespace_back.model.UserEntity;

public interface SessionService {
  SessionResponseDTO createSession(SessionRequestDTO dto, UserEntity student);
  SessionResponseDTO updateSessionStatus(Long sessionId, SessionUpdateDTO dto, UserEntity psychologist);
  SessionResponseDTO completeSession(Long sessionId, SessionUpdateDTO dto, UserEntity psychologist);
  SessionResponseDTO cancelSession(Long sessionId, String cancellationReason, UserEntity user);
  SessionResponseDTO getSession(Long sessionId, UserEntity user);
  List<SessionListDTO> getMySessionsAsStudent(UserEntity student);
  List<SessionListDTO> getMySessionsAsPsychologist(UserEntity psychologist);
  List<SessionListDTO> getPendingRequests(UserEntity psychologist);
}
