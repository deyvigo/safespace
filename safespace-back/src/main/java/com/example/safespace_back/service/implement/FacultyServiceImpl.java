package com.example.safespace_back.service.implement;

import com.example.safespace_back.dto.out.FacultyDTO;
import com.example.safespace_back.mapper.FacultyMapper;
import com.example.safespace_back.model.FacultyEntity;
import com.example.safespace_back.repository.FacultyRepository;
import com.example.safespace_back.service.FacultyService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyServiceImpl implements FacultyService {
    private final FacultyRepository facultyRepository;
    private final FacultyMapper facultyMapper;

    public FacultyServiceImpl (
        FacultyRepository facultyRepository,
        FacultyMapper facultyMapper
    ) {
        this.facultyRepository = facultyRepository;
        this.facultyMapper = facultyMapper;
    }

    @Override
    public List<FacultyDTO> getAllFaculties() {
        List<FacultyEntity> faculties = facultyRepository.findAll();
        return facultyMapper.toDTO(faculties);
    }
}
