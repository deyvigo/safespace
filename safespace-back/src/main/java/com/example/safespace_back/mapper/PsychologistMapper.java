package com.example.safespace_back.mapper;

import com.example.safespace_back.dto.in.RegisterPsychologistRequestDTO;
import com.example.safespace_back.dto.out.PsychologistDTO;
import com.example.safespace_back.dto.out.RegisterPsychologistResponseDTO;
import com.example.safespace_back.model.PsychologistEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PsychologistMapper {
    PsychologistEntity toEntity(RegisterPsychologistRequestDTO dto);
    RegisterPsychologistResponseDTO toResponse(PsychologistEntity userEntity);
    
    PsychologistDTO toPsychologistDTO(PsychologistEntity psychologistEntity);
}
