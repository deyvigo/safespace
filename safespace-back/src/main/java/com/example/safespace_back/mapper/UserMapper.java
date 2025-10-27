package com.example.safespace_back.mapper;

import com.example.safespace_back.dto.in.RegisterUserRequestDTO;
import com.example.safespace_back.dto.out.RegisterUserResponseDTO;
import com.example.safespace_back.model.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    UserEntity toEntity(RegisterUserRequestDTO registerUserRequestDTO);
    RegisterUserResponseDTO toResponse(UserEntity userEntity);
    List<RegisterUserResponseDTO> toResponse(List<UserEntity> userEntityList);
}
