package com.example.safespace_back.mapper;

import com.example.safespace_back.dto.in.RegisterUserRequest;
import com.example.safespace_back.dto.out.RegisterUserResponse;
import com.example.safespace_back.model.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    UserEntity toEntity(RegisterUserRequest registerUserRequest);
    RegisterUserResponse toResponse(UserEntity userEntity);
    List<RegisterUserResponse> toResponse(List<UserEntity> userEntityList);
}
