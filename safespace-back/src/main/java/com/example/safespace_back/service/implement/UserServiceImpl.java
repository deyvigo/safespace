package com.example.safespace_back.service.implement;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.safespace_back.dto.in.UpdatePsychologistRequestDTO;
import com.example.safespace_back.dto.in.UpdateStudentRequestDTO;
import com.example.safespace_back.dto.out.DigitalResourceResponseDTO;
import com.example.safespace_back.dto.out.PsychologistDTO;
import com.example.safespace_back.dto.out.StudentDTO;
import com.example.safespace_back.exception.ResourceNotFoundException;
import com.example.safespace_back.exception.StudentInvalidadIdFacultyException;
import com.example.safespace_back.exception.UnauthorizedAccessException;
import com.example.safespace_back.mapper.DigitalResourceMapper;
import com.example.safespace_back.mapper.PsychologistMapper;
import com.example.safespace_back.mapper.StudentMapper;
import com.example.safespace_back.model.DigitalResourcesEntity;
import com.example.safespace_back.model.FacultyEntity;
import com.example.safespace_back.model.PsychologistEntity;
import com.example.safespace_back.model.Role;
import com.example.safespace_back.model.StudentEntity;
import com.example.safespace_back.model.UserEntity;
import com.example.safespace_back.repository.DigitalResourcesRepository;
import com.example.safespace_back.repository.FacultyRepository;
import com.example.safespace_back.repository.UserRepository;
import com.example.safespace_back.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final StudentMapper studentMapper;
  private final PsychologistMapper psychologistMapper;
  private final FacultyRepository facultyRepository;
  private final DigitalResourcesRepository digitalResourcesRepository;
  private final DigitalResourceMapper digitalResourceMapper;

  @Override
  public Object findByUsername(String username, UserEntity currentUser) {
    UserEntity requestedUser = userRepository.findByUsername(username)
      .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

    Role currentUserRole = currentUser.getRole().getRole();

    if (currentUserRole == Role.STUDENT) {
      if (!currentUser.getUsername().equals(requestedUser.getUsername())) {
        throw new UnauthorizedAccessException("Los estudiantes solo pueden acceder a su propia información");
      }
      return studentMapper.toStudentDTO((StudentEntity) requestedUser);
    }

    if (currentUserRole == Role.PSYCHOLOGIST) {
      Role requestedUserRole = requestedUser.getRole().getRole();
      
      if (currentUser.getUsername().equals(requestedUser.getUsername())) {
        return psychologistMapper.toPsychologistDTO((PsychologistEntity) requestedUser);
      }
      
      if (requestedUserRole == Role.STUDENT) {
        return studentMapper.toStudentDTO((StudentEntity) requestedUser);
      }
      
      if (requestedUserRole == Role.PSYCHOLOGIST) {
        throw new UnauthorizedAccessException("Los psicólogos no pueden acceder a la información de otros psicólogos");
      }
    }

    throw new UnauthorizedAccessException("Acceso no autorizado");
  }

  @Override
  public StudentDTO updateStudent(UpdateStudentRequestDTO updateDTO, UserEntity currentUser) {
    if (currentUser.getRole().getRole() != Role.STUDENT) {
      throw new UnauthorizedAccessException("Solo los estudiantes pueden actualizar información de estudiante");
    }

    StudentEntity student = (StudentEntity) userRepository.findByUsername(currentUser.getUsername())
      .orElseThrow(() -> new ResourceNotFoundException("Estudiante no encontrado"));

    student.setName(updateDTO.name());
    student.setLastName(updateDTO.lastName());
    student.setBirthDay(updateDTO.birthDay());
    
    if (updateDTO.idFaculty() != null) {
      FacultyEntity faculty = facultyRepository.findById(updateDTO.idFaculty())
        .orElseThrow(() -> new StudentInvalidadIdFacultyException("Facultad no encontrada"));
      student.setFaculty(faculty);
    }
    
    StudentEntity savedStudent = (StudentEntity) userRepository.save(student);
    return studentMapper.toStudentDTO(savedStudent);
  }

  @Override
  public PsychologistDTO updatePsychologist(UpdatePsychologistRequestDTO updateDTO, UserEntity currentUser) {
    if (currentUser.getRole().getRole() != Role.PSYCHOLOGIST) {
      throw new UnauthorizedAccessException("Solo los psicólogos pueden actualizar información de psicólogo");
    }

    PsychologistEntity psychologist = (PsychologistEntity) userRepository.findByUsername(currentUser.getUsername())
      .orElseThrow(() -> new ResourceNotFoundException("Psicólogo no encontrado"));

    psychologist.setName(updateDTO.name());
    psychologist.setLastName(updateDTO.lastName());
    psychologist.setBirthDay(updateDTO.birthDay());
    psychologist.setUniversity(updateDTO.university());
    psychologist.setProfession(updateDTO.profession());
    
    PsychologistEntity savedPsychologist = (PsychologistEntity) userRepository.save(psychologist);
    return psychologistMapper.toPsychologistDTO(savedPsychologist);
  }

  @Override
  @Transactional
  public void addFavoriteResource(UserEntity currentUser, Long resourceId) {
    UserEntity user = userRepository.findById(currentUser.getId())
      .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    DigitalResourcesEntity resource = digitalResourcesRepository.findById(resourceId)
      .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));

    user.getFavoriteResources().add(resource);
    userRepository.save(user);
  }

  @Override
  @Transactional
  public void removeFavoriteResource(UserEntity currentUser, Long resourceId) {
    UserEntity user = userRepository.findById(currentUser.getId())
      .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    user.getFavoriteResources().removeIf(r -> r.getId().equals(resourceId));
    userRepository.save(user);
  }

  @Override
  @Transactional
  public List<DigitalResourceResponseDTO> getFavoriteResources(UserEntity currentUser) {
    UserEntity user = userRepository.findById(currentUser.getId())
      .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    return user.getFavoriteResources().stream()
      .map(digitalResourceMapper::toDTO)
      .toList();
  }

}
