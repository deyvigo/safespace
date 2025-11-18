package com.example.safespace_back.mapper;

import com.example.safespace_back.dto.out.NotificationResponseDTO;
import com.example.safespace_back.model.NotificationEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface NotificationMapper {
    @Mapping(target = "studentName", source = "student.name")
    @Mapping(target = "studentLastName", source = "student.lastName")
    @Mapping(target = "studentUsername", source = "student.username")
    @Mapping(target = "message", source = "content")
    NotificationResponseDTO fromEntitytoDTO(NotificationEntity notificationEntity);
}
