package com.example.safespace_back.controller;

import com.example.safespace_back.dto.in.LoginUserDTO;
import com.example.safespace_back.dto.in.RegisterUserRequestDTO;
import com.example.safespace_back.dto.out.JwtDTO;
import com.example.safespace_back.config.security.JwtService;
import com.example.safespace_back.mapper.UserMapper;
import com.example.safespace_back.model.UserEntity;
import com.example.safespace_back.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController()
@RequestMapping("/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserMapper userMapper;
    private final JwtService jwtService;

    public AuthController(
        UserRepository userRepository,
        BCryptPasswordEncoder bCryptPasswordEncoder,
        UserMapper userMapper,
        JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userMapper = userMapper;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterUserRequestDTO registerUserRequestDTO) {
        UserEntity userEntity = userRepository.findByUsername(registerUserRequestDTO.username()).orElse(null);

        if (userEntity != null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username is already in use"));
        }

        userEntity = userMapper.toEntity(registerUserRequestDTO);
        userEntity.setPassword(bCryptPasswordEncoder.encode(registerUserRequestDTO.password()));
        return ResponseEntity.ok(userMapper.toResponse(userRepository.save(userEntity)));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginUserDTO loginUserDTO) {
        UserEntity userEntity = userRepository.findByUsername(loginUserDTO.username()).orElse(null);

        if (userEntity == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username not found"));
        }

        if (!bCryptPasswordEncoder.matches(loginUserDTO.password(), userEntity.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Password are not correct"));
        }

        Map<String, Object> claims = Map.of(
            "username", userEntity.getUsername(),
            "name", userEntity.getName(),
            "lastName", userEntity.getLastName()
        );

        String token = jwtService.buildToken(claims);
        JwtDTO jwtDTO = new JwtDTO(token, token);

        return ResponseEntity.ok(jwtDTO);
    }
}
