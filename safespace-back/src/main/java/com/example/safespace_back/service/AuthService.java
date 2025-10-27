package com.example.safespace_back.service;

import com.example.safespace_back.dto.in.LoginUserDTO;
import com.example.safespace_back.dto.in.RegisterUserRequestDTO;
import com.example.safespace_back.dto.out.JwtDTO;
import com.example.safespace_back.dto.out.RegisterUserResponseDTO;

public interface AuthService {
    RegisterUserResponseDTO registerUser(RegisterUserRequestDTO dto);
    JwtDTO login(LoginUserDTO dto);
}
