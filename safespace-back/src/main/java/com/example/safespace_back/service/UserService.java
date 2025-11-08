package com.example.safespace_back.service;

import java.util.List;

import com.example.safespace_back.dto.in.UpdatePsychologistRequestDTO;
import com.example.safespace_back.dto.in.UpdateStudentRequestDTO;
import com.example.safespace_back.dto.out.DigitalResourceResponseDTO;
import com.example.safespace_back.dto.out.PsychologistDTO;
import com.example.safespace_back.dto.out.StudentDTO;
import com.example.safespace_back.model.UserEntity;

public interface UserService {
  Object findByUsername(String username, UserEntity currentUser);
  StudentDTO updateStudent(UpdateStudentRequestDTO updateDTO, UserEntity currentUser);
  PsychologistDTO updatePsychologist(UpdatePsychologistRequestDTO updateDTO, UserEntity currentUser);

  void addFavoriteResource(UserEntity  user, Long resourceId);
  void removeFavoriteResource(UserEntity  user, Long resourceId);
  List<DigitalResourceResponseDTO> getFavoriteResources(UserEntity  user);
}
