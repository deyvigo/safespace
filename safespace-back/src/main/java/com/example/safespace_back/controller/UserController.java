package com.example.safespace_back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.safespace_back.dto.in.UpdatePsychologistRequestDTO;
import com.example.safespace_back.dto.in.UpdateStudentRequestDTO;
import com.example.safespace_back.dto.out.PsychologistDTO;
import com.example.safespace_back.dto.out.StudentDTO;
import com.example.safespace_back.model.UserEntity;
import com.example.safespace_back.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @GetMapping("/{username}")
  public ResponseEntity<?> getUser(
      @PathVariable String username,
      @AuthenticationPrincipal UserEntity currentUser
  ) {
    Object userDTO = userService.findByUsername(username, currentUser);
    return ResponseEntity.ok(userDTO);
  }

  @PutMapping("/student")
  public ResponseEntity<StudentDTO> updateStudent(
      @RequestBody UpdateStudentRequestDTO updateDTO,
      @AuthenticationPrincipal UserEntity currentUser
  ) {
    StudentDTO updatedStudent = userService.updateStudent(updateDTO, currentUser);
    return ResponseEntity.ok(updatedStudent);
  }

  @PutMapping("/psychologist")
  public ResponseEntity<PsychologistDTO> updatePsychologist(
      @RequestBody UpdatePsychologistRequestDTO updateDTO,
      @AuthenticationPrincipal UserEntity currentUser
  ) {
    PsychologistDTO updatedPsychologist = userService.updatePsychologist(updateDTO, currentUser);
    return ResponseEntity.ok(updatedPsychologist);
  }
  
}
