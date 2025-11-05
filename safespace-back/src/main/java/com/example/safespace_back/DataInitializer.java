package com.example.safespace_back;

import com.example.safespace_back.dto.in.RegisterPsychologistRequestDTO;
import com.example.safespace_back.dto.in.RegisterStudentRequestDTO;
import com.example.safespace_back.model.*;
import com.example.safespace_back.repository.*;
import com.example.safespace_back.service.AuthService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {
    private final FacultyRepository facultyRepository;
    private final RoleRepository roleRepository;
    private final MoodRepository moodRepository;
    private final StudentRepository studentRepository;
    private final PsychologistRepository psychologistRepository;
    private final AuthService authService;
    private final UserRepository userRepository;

    public DataInitializer(
        FacultyRepository facultyRepository,
        RoleRepository roleRepository,
        MoodRepository moodRepository,
        StudentRepository studentRepository,
        PsychologistRepository psychologistRepository,
        AuthService authService,
        UserRepository userRepository) {
        this.facultyRepository = facultyRepository;
        this.roleRepository = roleRepository;
        this.moodRepository = moodRepository;
        this.studentRepository = studentRepository;
        this.psychologistRepository = psychologistRepository;
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (roleRepository.findAll().isEmpty()) {
            roleRepository.save(new RoleEntity(null, Role.STUDENT));
            roleRepository.save(new RoleEntity(null, Role.PSYCHOLOGIST));
        }

        if (facultyRepository.findAll().isEmpty()) {
            facultyRepository.save(new FacultyEntity(null, "Facultad de Ingeniería de Sistemas e Informática"));
            facultyRepository.save(new FacultyEntity(null, "Facultad de Ingeniería Industriale"));
            facultyRepository.save(new FacultyEntity(null, "Facultad de Ciencias Físicas"));
        }

        List<FacultyEntity> faculties = facultyRepository.findAll();

        if (userRepository.findAll().isEmpty()) {
            authService.registerStudent(
                 new RegisterStudentRequestDTO(
                    "jhondoe",
                    "123456",
                    "Jhon",
                    "Doe",
                    LocalDate.parse("2001-11-06"),
                    faculties.get(1).getId()
                )
            );
            authService.registerStudent(
                new RegisterStudentRequestDTO(
                    "janedoe",
                    "123456",
                    "Jane",
                    "Doe",
                    LocalDate.parse("2000-03-15"),
                    faculties.get(2).getId()
                )
            );

            authService.registerStudent(
                new RegisterStudentRequestDTO(
                    "mikebrown",
                    "123456",
                    "Mike",
                    "Brown",
                    LocalDate.parse("1999-07-22"),
                    faculties.get(0).getId()
                )
            );

            authService.registerPsychologist(
                new RegisterPsychologistRequestDTO(
                    "mindcoach",
                    "123456",
                    "Laura",
                    "Gonzales",
                    LocalDate.parse("1988-05-23"),
                    "Pontificia Universidad Católica del Perú",
                    "Psicóloga Clínica"
                )
            );

            authService.registerPsychologist(
                new RegisterPsychologistRequestDTO(
                    "therapist01",
                    "123456",
                    "Carlos",
                    "Ramírez",
                    LocalDate.parse("1992-09-10"),
                    "Universidad Peruana Cayetano Heredia",
                    "Psicólogo Educativo"
                )
            );
        }

        if (moodRepository.findAll().isEmpty()) {
            moodRepository.saveAll(List.of(
                MoodEntity.builder().name("muy triste").icon("😭").build(),
                MoodEntity.builder().name("triste").icon("😢").build(),
                MoodEntity.builder().name("cansado").icon("😩").build(),
                MoodEntity.builder().name("estresado").icon("😣").build(),
                MoodEntity.builder().name("neutral").icon("😐").build(),
                MoodEntity.builder().name("relajado").icon("😌").build(),
                MoodEntity.builder().name("feliz").icon("😊").build(),
                MoodEntity.builder().name("muy feliz").icon("😁").build(),
                MoodEntity.builder().name("emocionado").icon("🤩").build(),
                MoodEntity.builder().name("orgulloso").icon("😎").build()
            ));
        }

    }
}
