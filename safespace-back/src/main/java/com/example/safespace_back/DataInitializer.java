package com.example.safespace_back;

import com.example.safespace_back.dto.in.RegisterPsychologistRequestDTO;
import com.example.safespace_back.dto.in.RegisterStudentRequestDTO;
import com.example.safespace_back.model.*;
import com.example.safespace_back.repository.*;
import com.example.safespace_back.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final FacultyRepository facultyRepository;
    private final RoleRepository roleRepository;
    private final MoodRepository moodRepository;
    private final AuthService authService;
    private final UserRepository userRepository;
    private final DailyMoodRepository dailyMoodRepository;
    private final DigitalResourcesRepository digitalResourcesRepository;

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

        List<MoodEntity> moods = moodRepository.findAll();
        List<StudentEntity> students = userRepository.findAll().stream()
            .filter(u -> u.getRole().getRole().name().equals("STUDENT"))
            .map(u -> (StudentEntity) u)
            .toList();


        if (dailyMoodRepository.findAll().isEmpty()) {
            dailyMoodRepository.saveAll(
                List.of(
                    DailyMoodEntity.builder().createdAt(LocalDateTime.now()).description("ASDASDASD").student(students.get(0)).moods(Set.of(moods.get(0), moods.get(2))).build()
                )
            );
        }

        if (digitalResourcesRepository.findAll().isEmpty()) {
            DigitalResourcesEntity resource1 = new DigitalResourcesEntity();
            resource1.setTitle("Técnicas de respiración para la ansiedad");
            resource1.setDescription("Aprende ejercicios simples de respiración que te ayudarán a manejar momentos de ansiedad.");
            resource1.setCategory(CategoryDigitalResource.ANSIEDAD);
            resource1.setType(TypeDigitalResource.ARTICLE);
            resource1.setLink("https://ejemplo.com/tecnicas-respiracion");

            DigitalResourcesEntity resource2 = new DigitalResourcesEntity();
            resource2.setTitle("Mindfulness para estudiantes");
            resource2.setDescription("Video guiado de meditación diseñado especialmente para el estrés académico.");
            resource2.setCategory(CategoryDigitalResource.MINDFULNESS);
            resource2.setType(TypeDigitalResource.VIDEO);
            resource2.setLink("https://ejemplo.com/mindfulness-estudiantes");

            DigitalResourcesEntity resource3 = new DigitalResourcesEntity();
            resource3.setTitle("Guía de manejo del estrés");
            resource3.setDescription("Estrategias prácticas para identificar y gestionar el estrés en tu vida diaria.");
            resource3.setCategory(CategoryDigitalResource.ESTRES);
            resource3.setType(TypeDigitalResource.BOOK);
            resource3.setLink("https://ejemplo.com/guia-manejo-estres");

            DigitalResourcesEntity resource4 = new DigitalResourcesEntity();
            resource4.setTitle("Construyendo autoestima saludable");
            resource4.setDescription("Ejercicios y reflexiones para fortalecer tu confianza y valoración personal.");
            resource4.setCategory(CategoryDigitalResource.AUTOESTIMA);
            resource4.setType(TypeDigitalResource.ARTICLE);
            resource4.setLink("https://ejemplo.com/construyendo-autoestima");

            DigitalResourcesEntity resource5 = new DigitalResourcesEntity();
            resource5.setTitle("Hábitos de sueño saludables");
            resource5.setDescription("Mejora tu calidad de sueño con estas recomendaciones basadas en evidencia.");
            resource5.setCategory(CategoryDigitalResource.BIENESTAR);
            resource5.setType(TypeDigitalResource.BOOK);
            resource5.setLink("https://ejemplo.com/habitos-sueno");

            DigitalResourcesEntity resource6 = new DigitalResourcesEntity();
            resource6.setTitle("Manejo de emociones difíciles");
            resource6.setDescription("Video educativo sobre cómo reconocer y procesar emociones intensas de manera saludable.");
            resource6.setCategory(CategoryDigitalResource.EMOCIONES);
            resource6.setType(TypeDigitalResource.VIDEO);
            resource6.setLink("https://ejemplo.com/manejo-emociones");

            digitalResourcesRepository.saveAll(List.of(
                resource1, resource2, resource3, resource4, resource5, resource6
            ));
        }

    }
}
