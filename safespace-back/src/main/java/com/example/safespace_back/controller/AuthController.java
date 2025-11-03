package com.example.safespace_back.controller;

import com.example.safespace_back.dto.in.LoginUserDTO;
import com.example.safespace_back.dto.in.RegisterPsychologistRequestDTO;
import com.example.safespace_back.dto.in.RegisterStudentRequestDTO;
import com.example.safespace_back.dto.out.JwtDTO;
import com.example.safespace_back.dto.out.RegisterPsychologistResponseDTO;
import com.example.safespace_back.dto.out.RegisterStudentResponseDTO;
import com.example.safespace_back.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) { this.authService = authService; }

    @PostMapping("/register/student")
    public ResponseEntity<RegisterStudentResponseDTO> registerStudent(@Valid @RequestBody RegisterStudentRequestDTO registerStudentRequestDTO) {
        RegisterStudentResponseDTO userDTO = authService.registerStudent(registerStudentRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
    }

    @PostMapping("/register/psychologist")
    public ResponseEntity<RegisterPsychologistResponseDTO> registerPsychologist(@Valid @RequestBody RegisterPsychologistRequestDTO registerPsychologistRequestDTO) {
        RegisterPsychologistResponseDTO userDTO = authService.registerPsychologist(registerPsychologistRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtDTO> login(@Valid @RequestBody LoginUserDTO loginUserDTO) {
        JwtDTO jwtDTO = authService.login(loginUserDTO);
        return ResponseEntity.status(HttpStatus.OK).body(jwtDTO);
    }
}
