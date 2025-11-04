package com.example.safespace_back.controller;

import com.example.safespace_back.dto.out.FacultyDTO;
import com.example.safespace_back.service.FacultyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/faculties")
public class FacultyController {
    private final FacultyService facultyService;

    public FacultyController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    @GetMapping("")
    public ResponseEntity<List<FacultyDTO>> get() {
        List<FacultyDTO> faculties = facultyService.getAllFaculties();
        return ResponseEntity.ok(faculties);
    }
}
