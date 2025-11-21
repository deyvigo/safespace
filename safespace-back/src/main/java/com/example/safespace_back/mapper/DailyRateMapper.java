package com.example.safespace_back.mapper;

import com.example.safespace_back.dto.out.DailyRateResponseDTO;
import com.example.safespace_back.model.DailyRateEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface DailyRateMapper {
    DailyRateResponseDTO fromEntityToDTO(DailyRateEntity dailyRateEntity);
}
