package com.example.safespace_back.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

import com.example.safespace_back.dto.out.SessionListDTO;
import com.example.safespace_back.dto.out.SessionResponseDTO;
import com.example.safespace_back.model.SessionEntity;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface SessionMapper {
  
  @Mapping(source = "student.id", target = "studentId")
  @Mapping(target = "studentName", expression = "java(session.getStudent().getName() + \" \" + session.getStudent().getLastName())")
  @Mapping(source = "psychologist.id", target = "psychologistId")
  @Mapping(target = "psychologistName", expression = "java(session.getPsychologist().getName() + \" \" + session.getPsychologist().getLastName())")
  SessionResponseDTO toResponseDTO(SessionEntity session);
  
  @Mapping(source = "student.id", target = "studentId")
  @Mapping(target = "studentName", expression = "java(session.getStudent().getName() + \" \" + session.getStudent().getLastName())")
  @Mapping(source = "psychologist.id", target = "psychologistId")
  @Mapping(target = "psychologistName", expression = "java(session.getPsychologist().getName() + \" \" + session.getPsychologist().getLastName())")
  SessionListDTO toListDTO(SessionEntity session);
}
