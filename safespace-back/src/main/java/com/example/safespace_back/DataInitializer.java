package com.example.safespace_back;

import com.example.safespace_back.model.FacultyEntity;
import com.example.safespace_back.model.Role;
import com.example.safespace_back.model.RoleEntity;
import com.example.safespace_back.repository.FacultyRepository;
import com.example.safespace_back.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DataInitializer implements CommandLineRunner {
    private final FacultyRepository facultyRepository;
    private final RoleRepository roleRepository;

    public DataInitializer(FacultyRepository facultyRepository, RoleRepository roleRepository) {
        this.facultyRepository = facultyRepository;
        this.roleRepository = roleRepository;
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
    }
}
