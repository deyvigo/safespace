package com.example.safespace_back.mapper;

import com.example.safespace_back.dto.in.RegisterStudentRequestDTO;
import com.example.safespace_back.dto.out.RegisterStudentResponseDTO;
import com.example.safespace_back.dto.out.StudentDTO;
import com.example.safespace_back.model.StudentEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface StudentMapper {
    StudentEntity toEntity(RegisterStudentRequestDTO dto);
    RegisterStudentResponseDTO toResponse(StudentEntity userEntity);
    
    StudentDTO toStudentDTO(StudentEntity studentEntity);
}
