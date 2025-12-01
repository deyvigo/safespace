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
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
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
    private final ChatRepository chatRepository;
    private final PsychologistScheduleRepository psychologistScheduleRepository;

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

        // add the psychologist with fewer students subscribed
        List<Long> counts = psychologistRepository.findStudentCountOrderedAsc(PageRequest.of(0, 1));
        PsychologistEntity psychologist = psychologistRepository.findAllByStudentCount(counts.getFirst()).getFirst();
        student.setPsychologist(psychologist);

        StudentEntity saved =  studentRepository.save(student);

        // create chat entity
        chatRepository.save(
            ChatEntity
                .builder()
                .createdAt(LocalDateTime.now())
                .student(saved)
                .psychologist(psychologist)
                .build()
        );

        return studentMapper.toResponse(saved);
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

        PsychologistEntity savedPsychologist = psychologistRepository.save(psychologist);
        
        createDefaultSchedule(savedPsychologist);

        return psychologistMapper.toResponse(savedPsychologist);
    }

    private void createDefaultSchedule(PsychologistEntity psychologist) {
        List<PsychologistScheduleEntity> schedules = new ArrayList<>();
        
        // Lunes a Viernes: 8:00 AM - 4:00 PM
        for (DayOfWeek day : List.of(DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, 
                                      DayOfWeek.THURSDAY, DayOfWeek.FRIDAY)) {
            schedules.add(PsychologistScheduleEntity.builder()
                .psychologist(psychologist)
                .dayOfWeek(day)
                .startTime(LocalTime.of(8, 0))  // 8:00 AM
                .endTime(LocalTime.of(16, 0))   // 4:00 PM
                .sessionDuration(60)
                .breakBetweenSessions(15)
                .active(true)
                .build());
        }
        
        // Sábado: 8:00 AM - 12:00 PM
        schedules.add(PsychologistScheduleEntity.builder()
            .psychologist(psychologist)
            .dayOfWeek(DayOfWeek.SATURDAY)
            .startTime(LocalTime.of(8, 0))   // 8:00 AM
            .endTime(LocalTime.of(12, 0))    // 12:00 PM
            .sessionDuration(60)
            .breakBetweenSessions(15)
            .active(true)
            .build());
        
        psychologistScheduleRepository.saveAll(schedules);
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
            "role", userEntity.getRole().getRole(),
                "id", userEntity.getId()
        );

        String token = jwtService.buildToken(claims);
        return new JwtDTO(token, token);
    }
}
