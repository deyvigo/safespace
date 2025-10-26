package com.example.safespace_back.mapper;

import com.example.safespace_back.dto.in.UserLoginRequest;
import com.example.safespace_back.dto.out.LoginUserResponse;
import com.example.safespace_back.model.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    UserEntity toEntity(UserLoginRequest userLoginRequest);
    LoginUserResponse toResponse(UserEntity userEntity);
    List<LoginUserResponse> toResponse(List<UserEntity> userEntityList);
}
