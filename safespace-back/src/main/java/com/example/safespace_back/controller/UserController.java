package com.example.safespace_back.controller;

import com.example.safespace_back.dto.out.RegisterUserResponseDTO;
import com.example.safespace_back.mapper.UserMapper;
import com.example.safespace_back.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private UserRepository userRepository;
    private final UserMapper userMapper;

    public UserController(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @GetMapping("")
    public List<RegisterUserResponseDTO> getAllUsers() {
        return userMapper.toResponse(userRepository.findAll());
    }
}
