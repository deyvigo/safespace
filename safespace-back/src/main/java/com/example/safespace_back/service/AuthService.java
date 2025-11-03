package com.example.safespace_back.service;

import com.example.safespace_back.dto.in.LoginUserDTO;
import com.example.safespace_back.dto.in.RegisterPsychologistRequestDTO;
import com.example.safespace_back.dto.in.RegisterStudentRequestDTO;
import com.example.safespace_back.dto.out.JwtDTO;
import com.example.safespace_back.dto.out.RegisterPsychologistResponseDTO;
import com.example.safespace_back.dto.out.RegisterStudentResponseDTO;

public interface AuthService {
    RegisterStudentResponseDTO registerStudent(RegisterStudentRequestDTO registerUserRequestDTO);
    RegisterPsychologistResponseDTO registerPsychologist(RegisterPsychologistRequestDTO registerPsychologistRequestDTO);
    JwtDTO login(LoginUserDTO dto);
}
