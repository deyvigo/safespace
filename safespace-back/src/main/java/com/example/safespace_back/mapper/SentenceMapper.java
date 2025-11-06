package com.example.safespace_back.mapper;

import com.example.safespace_back.dto.out.SentenceResponseDTO;
import com.example.safespace_back.model.SentenceEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface SentenceMapper {
    SentenceResponseDTO toOutDTO(SentenceEntity sentenceEntity);
    List<SentenceResponseDTO> toOutDTO(List<SentenceEntity> sentenceEntities);
}
