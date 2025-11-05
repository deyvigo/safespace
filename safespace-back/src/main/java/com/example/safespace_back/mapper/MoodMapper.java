package com.example.safespace_back.mapper;

import com.example.safespace_back.dto.out.MoodDTO;
import com.example.safespace_back.model.MoodEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MoodMapper {
    List<MoodDTO> toDTO(List<MoodEntity> list);
}
