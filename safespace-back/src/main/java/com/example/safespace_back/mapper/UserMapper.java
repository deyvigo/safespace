package com.example.safespace_back.mapper;

import com.example.safespace_back.dto.out.RegisterUserDTO;
import com.example.safespace_back.model.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    UserEntity toEntity(com.example.safespace_back.dto.in.RegisterUserDTO registerUserDTO);
    RegisterUserDTO toResponse(UserEntity userEntity);
    List<RegisterUserDTO> toResponse(List<UserEntity> userEntityList);
}
