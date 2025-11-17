package com.example.safespace_back.service.implement;

import com.example.safespace_back.config.security.JwtService;
import com.example.safespace_back.dto.in.LoginUserDTO;
import com.example.safespace_back.dto.in.RegisterPsychologistRequestDTO;
import com.example.safespace_back.dto.in.RegisterStudentRequestDTO;
import com.example.safespace_back.dto.out.JwtDTO;
import com.example.safespace_back.dto.out.RegisterPsychologistResponseDTO;
import com.example.safespace_back.dto.out.RegisterStudentResponseDTO;
import com.example.safespace_back.exception.ResourceNotFoundException;
import com.example.safespace_back.exception.UserInvalidCredentialsException;
import com.example.safespace_back.exception.UsernameAlreadyUsedException;
import com.example.safespace_back.mapper.PsychologistMapper;
import com.example.safespace_back.mapper.StudentMapper;
import com.example.safespace_back.model.*;
import com.example.safespace_back.repository.*;
import com.example.safespace_back.service.AuthService;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final FacultyRepository facultyRepository;
    private final RoleRepository roleRepository;
    private final StudentRepository studentRepository;
    private final PsychologistRepository psychologistRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final StudentMapper studentMapper;
    private final PsychologistMapper psychologistMapper;
    private final JwtService jwtService;

    public AuthServiceImpl (
        UserRepository userRepository,
        FacultyRepository facultyRepository,
        RoleRepository roleRepository,
        StudentRepository studentRepository,
        PsychologistRepository psychologistRepository,
        BCryptPasswordEncoder bCryptPasswordEncoder,
        StudentMapper studentMapper,
        PsychologistMapper psychologistMapper,
        JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.facultyRepository = facultyRepository;
        this.roleRepository = roleRepository;
        this.studentRepository = studentRepository;
        this.psychologistRepository = psychologistRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.studentMapper = studentMapper;
        this.psychologistMapper = psychologistMapper;
        this.jwtService = jwtService;
    }

    @Override
    public RegisterStudentResponseDTO registerStudent(RegisterStudentRequestDTO dto) {
        if (userRepository.existsByUsername(dto.username())) {
            throw new UsernameAlreadyUsedException("Username is already in use");
        }

        StudentEntity student = studentMapper.toEntity(dto);
        student.setPassword(bCryptPasswordEncoder.encode(dto.password()));
        FacultyEntity faculty = facultyRepository.findById(dto.idFaculty())
            .orElseThrow(() -> new ResourceNotFoundException("id_faculty not found"));
        student.setFaculty(faculty);
        RoleEntity role = roleRepository.findByRole(Role.STUDENT)
            .orElseThrow(() -> new ResourceNotFoundException("id_role not found"));
        student.setRole(role);

        // add the psychologist with less students subscribed
        List<Long> counts = psychologistRepository.findStudentCountOrderedAsc(PageRequest.of(0, 1));
        student.setPsychologist(psychologistRepository.findAllByStudentCount(counts.getFirst()).getFirst());

        return studentMapper.toResponse(studentRepository.save(student));
    }

    @Override
    public RegisterPsychologistResponseDTO registerPsychologist(RegisterPsychologistRequestDTO dto) {
        if (userRepository.existsByUsername(dto.username())) {
            throw new UsernameAlreadyUsedException("Username is already in use");
        }

        PsychologistEntity psychologist = psychologistMapper.toEntity(dto);
        psychologist.setPassword(bCryptPasswordEncoder.encode(dto.password()));
        RoleEntity role = roleRepository.findByRole(Role.PSYCHOLOGIST)
            .orElseThrow(() -> new ResourceNotFoundException("id_role not found"));
        psychologist.setRole(role);

        return psychologistMapper.toResponse(psychologistRepository.save(psychologist));
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
            "lastName", userEntity.getLastName(),
            "role", userEntity.getRole().getRole()
        );

        String token = jwtService.buildToken(claims);
        return new JwtDTO(token, token);
    }
}
