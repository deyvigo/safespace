package com.example.safespace_back.service;

import com.example.safespace_back.dto.out.FacultyDTO;
import com.example.safespace_back.model.FacultyEntity;

import java.util.List;

public interface FacultyService {
    List<FacultyDTO> getAllFaculties();
}
