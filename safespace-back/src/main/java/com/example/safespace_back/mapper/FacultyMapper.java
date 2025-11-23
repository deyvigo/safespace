package com.example.safespace_back.mapper;

import com.example.safespace_back.dto.out.FacultyDTO;
import com.example.safespace_back.model.FacultyEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface FacultyMapper {
    FacultyDTO toDTO(FacultyEntity userEntity);
    List<FacultyDTO> toDTO(List<FacultyEntity> list);
}
