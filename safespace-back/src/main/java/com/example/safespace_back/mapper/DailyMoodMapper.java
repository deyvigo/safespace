package com.example.safespace_back.mapper;

import com.example.safespace_back.dto.out.DailyMoodDTO;
import com.example.safespace_back.model.DailyMoodEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface DailyMoodMapper {
    DailyMoodDTO toDTO(DailyMoodEntity dto);
}
