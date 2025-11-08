package com.example.safespace_back.mapper;

import com.example.safespace_back.dto.out.DigitalResourceResponseDTO;
import com.example.safespace_back.model.DigitalResourcesEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface DigitalResourceMapper {
    DigitalResourceResponseDTO toDTO(DigitalResourcesEntity entity);
}
