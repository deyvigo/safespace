package com.example.safespace_back.mapper;

import com.example.safespace_back.dto.in.RegisterStudentRequestDTO;
import com.example.safespace_back.dto.out.RegisterStudentResponseDTO;
import com.example.safespace_back.model.StudentEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface StudentMapper {
    StudentEntity toEntity(RegisterStudentRequestDTO dto);
    RegisterStudentResponseDTO toResponse(StudentEntity userEntity);
}
