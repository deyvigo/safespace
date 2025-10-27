package com.example.safespace_back.service.implement;

import com.example.safespace_back.config.security.JwtService;
import com.example.safespace_back.dto.in.LoginUserDTO;
import com.example.safespace_back.dto.in.RegisterUserRequestDTO;
import com.example.safespace_back.dto.out.JwtDTO;
import com.example.safespace_back.dto.out.RegisterUserResponseDTO;
import com.example.safespace_back.exception.UserInvalidCredentialsException;
import com.example.safespace_back.exception.UsernameAlreadyUsedException;
import com.example.safespace_back.mapper.UserMapper;
import com.example.safespace_back.model.UserEntity;
import com.example.safespace_back.repository.UserRepository;
import com.example.safespace_back.service.AuthService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserMapper userMapper;
    private final JwtService jwtService;

    public AuthServiceImpl (
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

    @Override
    public RegisterUserResponseDTO registerUser(RegisterUserRequestDTO dto) {
        if (userRepository.existsByUsername(dto.username())) {
            throw new UsernameAlreadyUsedException("Username is already in use");
        }

        UserEntity userEntity = userMapper.toEntity(dto);
        userEntity.setPassword(bCryptPasswordEncoder.encode(dto.password()));
        UserEntity saved = userRepository.save(userEntity);

        return userMapper.toResponse(saved);
    }

    @Override
    public JwtDTO login(LoginUserDTO dto) {
        UserEntity userEntity = userRepository.findByUsername(dto.username())
            .orElseThrow(() -> new UserInvalidCredentialsException("Username not found"));

        if (!bCryptPasswordEncoder.matches(dto.password(), userEntity.getPassword())) {
            throw new UserInvalidCredentialsException("Wrong password");
        }

        Map<String, Object> claims = Map.of(
            "username", userEntity.getUsername(),
            "name", userEntity.getName(),
            "lastName", userEntity.getLastName()
        );

        String token = jwtService.buildToken(claims);
        return new JwtDTO(token, token);
    }
}
