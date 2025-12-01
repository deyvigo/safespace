package com.example.safespace_back.mapper;

import com.example.safespace_back.dto.out.DigitalResourceResponseDTO;
import com.example.safespace_back.model.DigitalResourcesEntity;
import com.example.safespace_back.model.ImageMetadataEntity;
import com.example.safespace_back.dto.out.ImageMetadataDTO;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface DigitalResourceMapper {

    @Mapping(target = "id_psychologist", source = "entity.psychologist.id")
    @Mapping(target = "favorite", source = "favorite")
    DigitalResourceResponseDTO toDTO(DigitalResourcesEntity entity, boolean favorite);

    ImageMetadataDTO toDTO(ImageMetadataEntity entity);
    List<ImageMetadataDTO> toDTO(List<ImageMetadataEntity> entityList);
}