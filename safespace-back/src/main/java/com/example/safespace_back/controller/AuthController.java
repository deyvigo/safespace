package com.example.safespace_back.controller;

import com.example.safespace_back.dto.in.RegisterUserRequest;
import com.example.safespace_back.mapper.UserMapper;
import com.example.safespace_back.model.UserEntity;
import com.example.safespace_back.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
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

    public AuthController(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userMapper = userMapper;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterUserRequest registerUserRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        UserEntity userEntity = userRepository.findByUsername(registerUserRequest.getUsername()).orElse(null);
        if (userEntity != null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username is already in use"));
        }

        userEntity = userMapper.toEntity(registerUserRequest);
        return ResponseEntity.ok(userMapper.toResponse(userRepository.save(userEntity)));
    }
}
