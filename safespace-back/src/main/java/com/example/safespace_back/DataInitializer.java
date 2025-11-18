package com.example.safespace_back;

import com.example.safespace_back.dto.in.DailyMoodRequestDTO;
import com.example.safespace_back.dto.in.RegisterPsychologistRequestDTO;
import com.example.safespace_back.dto.in.RegisterStudentRequestDTO;
import com.example.safespace_back.model.*;
import com.example.safespace_back.repository.*;
import com.example.safespace_back.service.AuthService;
import com.example.safespace_back.service.DailyMoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final FacultyRepository facultyRepository;
    private final RoleRepository roleRepository;
    private final MoodRepository moodRepository;
    private final AuthService authService;
    private final UserRepository userRepository;
    private final DailyMoodRepository dailyMoodRepository;
    private final DailyMoodService dailyMoodService;
    private final DigitalResourcesRepository digitalResourcesRepository;
    private final SentenceRepository sentenceRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (roleRepository.findAll().isEmpty()) {
            roleRepository.save(new RoleEntity(null, Role.STUDENT));
            roleRepository.save(new RoleEntity(null, Role.PSYCHOLOGIST));
        }

        if (facultyRepository.findAll().isEmpty()) {
            facultyRepository.saveAll(List.of(
                FacultyEntity.builder().name("Facultad de Ingeniería Mecánica").build(),
                FacultyEntity.builder().name("Facultad de Ingeniería Electrónica").build(),
                FacultyEntity.builder().name("Facultad de Ingeniería Civil").build(),
                FacultyEntity.builder().name("Facultad de Ingeniería Química").build(),
                FacultyEntity.builder().name("Facultad de Ciencias Matemáticas").build(),
                FacultyEntity.builder().name("Facultad de Ciencias Biológicas").build(),
                FacultyEntity.builder().name("Facultad de Ciencias Sociales").build(),
                FacultyEntity.builder().name("Facultad de Ciencias Económicas").build(),
                FacultyEntity.builder().name("Facultad de Ciencias Administrativas").build(),
                FacultyEntity.builder().name("Facultad de Ciencias Contables").build(),
                FacultyEntity.builder().name("Facultad de Derecho y Ciencias Políticas").build(),
                FacultyEntity.builder().name("Facultad de Medicina").build(),
                FacultyEntity.builder().name("Facultad de Odontología").build(),
                FacultyEntity.builder().name("Facultad de Farmacia y Bioquímica").build(),
                FacultyEntity.builder().name("Facultad de Psicología").build(),
                FacultyEntity.builder().name("Facultad de Educación").build(),
                FacultyEntity.builder().name("Facultad de Arquitectura, Urbanismo y Artes").build(),
                FacultyEntity.builder().name("Facultad de Letras y Ciencias Humanas").build()
            ));
        }

        List<FacultyEntity> faculties = facultyRepository.findAll();

        if (userRepository.findAll().isEmpty()) {
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

            authService.registerStudent(
                new RegisterStudentRequestDTO(
                    "jhondoe",
                    "123456",
                    "Jhon",
                    "Doe",
                    LocalDate.parse("2001-11-06"),
                    faculties.get(ThreadLocalRandom.current().nextInt(faculties.size())).getId()
                )
            );
            authService.registerStudent(
                new RegisterStudentRequestDTO(
                    "janedoe",
                    "123456",
                    "Jane",
                    "Doe",
                    LocalDate.parse("2000-03-15"),
                    faculties.get(ThreadLocalRandom.current().nextInt(faculties.size())).getId()
                )
            );

            authService.registerStudent(
                new RegisterStudentRequestDTO(
                    "mikebrown",
                    "123456",
                    "Mike",
                    "Brown",
                    LocalDate.parse("1999-07-22"),
                    faculties.get(ThreadLocalRandom.current().nextInt(faculties.size())).getId()
                )
            );
        }

        if (moodRepository.findAll().isEmpty()) {
            moodRepository.saveAll(List.of(
                MoodEntity.builder().name("Muy triste").icon("😭").build(),
                MoodEntity.builder().name("Triste").icon("🥺").build(),
                MoodEntity.builder().name("Cansado").icon("😮‍💨").build(),
                MoodEntity.builder().name("Estresado").icon("😫").build(),
                MoodEntity.builder().name("Neutral").icon("😐").build(),
                MoodEntity.builder().name("Relajado").icon("😌").build(),
                MoodEntity.builder().name("Feliz").icon("😊").build(),
                MoodEntity.builder().name("Muy feliz").icon("😄").build(),
                MoodEntity.builder().name("Emocionado").icon("🤩").build(),
                MoodEntity.builder().name("Orgulloso").icon("😎").build()

            ));
        }

        List<MoodEntity> moods = moodRepository.findAll();
        List<StudentEntity> students = userRepository.findAll().stream()
            .filter(u -> u.getRole().getRole().name().equals("STUDENT"))
            .map(u -> (StudentEntity) u)
            .toList();

        List<PsychologistEntity> psychologists = userRepository.findAll().stream()
            .filter(u -> u.getRole().getRole().name().equals("PSYCHOLOGIST"))
            .map(u -> (PsychologistEntity) u)
            .toList();

        if (dailyMoodRepository.findAll().isEmpty()) {
            dailyMoodService.registerDailyMoodToday(
                new DailyMoodRequestDTO(
                    List.of(1L), // Muy triste 😭
                    "Ha sido un día difícil, me siento desanimado."
                ),
                LocalDateTime.now().minusDays(4),
                students.getFirst()
            );

            dailyMoodService.registerDailyMoodToday(
                new DailyMoodRequestDTO(
                    List.of(2L, 3L), // Triste 🥺 + Cansado 😮‍💨
                    "Un poco triste y agotado, fue pesado en clases."
                ),
                LocalDateTime.now().minusDays(3),
                students.getFirst()
            );

            dailyMoodService.registerDailyMoodToday(
                new DailyMoodRequestDTO(
                    List.of(5L), // Neutral 😐
                    "Día normal, nada especial."
                ),
                LocalDateTime.now().minusDays(2),
                students.getFirst()
            );

            dailyMoodService.registerDailyMoodToday(
                new DailyMoodRequestDTO(
                    List.of(7L, 9L), // Feliz 😊 + Emocionado 🤩
                    "Me fue bien en mis trabajos y estoy motivado."
                ),
                LocalDateTime.now().minusDays(1),
                students.getFirst()
            );

//            dailyMoodService.registerDailyMoodToday(
//                new DailyMoodRequestDTO(
//                    List.of(10L), // Orgulloso 😎
//                    "Logré completar un proyecto importante, me siento orgulloso."
//                ),
//                LocalDateTime.now(),
//                students.getFirst()
//            );

            // Other students
            dailyMoodService.registerDailyMoodToday(
                new DailyMoodRequestDTO(
                    List.of(1L), // Muy triste 😭
                    "Ha sido un día difícil, me siento desanimado."
                ),
                LocalDateTime.now().minusDays(4),
                students.get(2)
            );
        }

        if (sentenceRepository.findAll().isEmpty()) {
            sentenceRepository.saveAll(List.of(
                SentenceEntity.builder()
                    .content("No puedes cambiar lo que te ocurre, pero sí puedes cambiar la manera en que respondes.")
                    .psychologist(psychologists.get(ThreadLocalRandom.current().nextInt(psychologists.size())))
                    .build(),

                SentenceEntity.builder()
                    .content("Eres más fuerte de lo que piensas y más capaz de lo que imaginas.")
                    .psychologist(psychologists.get(ThreadLocalRandom.current().nextInt(psychologists.size())))
                    .build(),

                SentenceEntity.builder()
                    .content("Cada pequeño paso hacia adelante es un avance, aunque no lo parezca.")
                    .psychologist(psychologists.get(ThreadLocalRandom.current().nextInt(psychologists.size())))
                    .build(),

                SentenceEntity.builder()
                    .content("No te juzgues por tus caídas, sino por las veces que decides levantarte.")
                    .psychologist(psychologists.get(ThreadLocalRandom.current().nextInt(psychologists.size())))
                    .build(),

                SentenceEntity.builder()
                    .content("Tu bienestar empieza cuando decides escucharte y cuidarte.")
                    .psychologist(psychologists.get(ThreadLocalRandom.current().nextInt(psychologists.size())))
                    .build(),

                SentenceEntity.builder()
                    .content("Permítete sentir, porque sentir también es avanzar.")
                    .psychologist(psychologists.get(ThreadLocalRandom.current().nextInt(psychologists.size())))
                    .build(),

                SentenceEntity.builder()
                    .content("No tienes que poder con todo; solo con lo que toca hoy.")
                    .psychologist(psychologists.get(ThreadLocalRandom.current().nextInt(psychologists.size())))
                    .build(),

                SentenceEntity.builder()
                    .content("Lo que hoy te pesa, mañana puede convertirse en tu mayor aprendizaje.")
                    .psychologist(psychologists.get(ThreadLocalRandom.current().nextInt(psychologists.size())))
                    .build(),

                SentenceEntity.builder()
                    .content("El progreso no siempre es visible, pero siempre existe cuando sigues intentándolo.")
                    .psychologist(psychologists.get(ThreadLocalRandom.current().nextInt(psychologists.size())))
                    .build(),

                SentenceEntity.builder()
                    .content("No eres el mismo de ayer: has crecido, aprendido y avanzado más de lo que notas.")
                    .psychologist(psychologists.get(ThreadLocalRandom.current().nextInt(psychologists.size())))
                    .build()
            ));
        }

        if (digitalResourcesRepository.findAll().isEmpty()) {
            DigitalResourcesEntity resource1 = new DigitalResourcesEntity();
            resource1.setTitle("Técnicas de respiración para la ansiedad");
            resource1.setDescription("Aprende ejercicios simples de respiración que te ayudarán a manejar momentos de ansiedad.");
            resource1.setCategory(CategoryDigitalResource.ANSIEDAD);
            resource1.setType(TypeDigitalResource.ARTICLE);
            resource1.setLink("https://www.youtube.com/watch?v=I5tip6L5fOQ");

            DigitalResourcesEntity resource2 = new DigitalResourcesEntity();
            resource2.setTitle("Mindfulness para estudiantes");
            resource2.setDescription("Video guiado de meditación diseñado especialmente para el estrés académico.");
            resource2.setCategory(CategoryDigitalResource.MINDFULNESS);
            resource2.setType(TypeDigitalResource.VIDEO);
            resource2.setLink("https://www.youtube.com/watch?v=IShkpOm63gg");

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
