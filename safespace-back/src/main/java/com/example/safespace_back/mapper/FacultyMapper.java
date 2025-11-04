package com.example.safespace_back.mapper;

import com.example.safespace_back.dto.out.FacultyDTO;
import com.example.safespace_back.model.FacultyEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface FacultyMapper {
    FacultyDTO toDTO(FacultyEntity entity);
}
