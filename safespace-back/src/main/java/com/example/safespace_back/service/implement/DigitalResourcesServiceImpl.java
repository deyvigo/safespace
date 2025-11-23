package com.example.safespace_back.service.implement;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.safespace_back.dto.in.DigitalResourceRequestDTO;
import com.example.safespace_back.dto.out.DigitalResourceResponseDTO;
import com.example.safespace_back.exception.ResourceNotFoundException;
import com.example.safespace_back.exception.UnauthorizedAccessException;
import com.example.safespace_back.mapper.DigitalResourceMapper;
import com.example.safespace_back.model.DigitalResourcesEntity;
import com.example.safespace_back.model.PsychologistEntity;
import com.example.safespace_back.model.ImageMetadataEntity;
import com.example.safespace_back.model.UserEntity;
import com.example.safespace_back.repository.DigitalResourcesRepository;
import com.example.safespace_back.service.DigitalResourcesService;
import com.example.safespace_back.service.ImageMetadataService;
import java.util.ArrayList;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DigitalResourcesServiceImpl implements DigitalResourcesService {

  private final DigitalResourcesRepository digitalResourcesRepository;
  private final DigitalResourceMapper digitalResourceMapper;
  private final ImageMetadataService imageMetadataService;

  @Override
  @Transactional
  public DigitalResourceResponseDTO save(DigitalResourceRequestDTO digitalResourceDTO, UserEntity currentUser) {
    if (!(currentUser instanceof PsychologistEntity)) {
      throw new ResourceNotFoundException("El usuario con ID " + currentUser.getId() + " no es un psicólogo");
    }

    DigitalResourcesEntity entity = new DigitalResourcesEntity();
    entity.setTitle(digitalResourceDTO.title());
    entity.setDescription(digitalResourceDTO.description());
    entity.setCategory(digitalResourceDTO.category());
    entity.setType(digitalResourceDTO.type());
    entity.setLink(digitalResourceDTO.link());
    entity.setPsychologist((PsychologistEntity) currentUser);
    entity = digitalResourcesRepository.save(entity);
    if (digitalResourceDTO.images() != null && !digitalResourceDTO.images().isEmpty()) {
        List<ImageMetadataEntity> imageEntities = new ArrayList<>();

        for (String base64 : digitalResourceDTO.images()) {
              ImageMetadataEntity img = imageMetadataService.uploadAndCreate(base64, entity);
              imageEntities.add(img);
        }

        entity.setImages(imageEntities);
    }

    return digitalResourceMapper.toDTO(entity);
  }

  @Override
  @Transactional(readOnly = true)
  public DigitalResourceResponseDTO findById(Long id) {
    DigitalResourcesEntity entity = digitalResourcesRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Recurso digital no encontrado con ID: " + id));
    return digitalResourceMapper.toDTO(entity);
  }

  @Override
  @Transactional(readOnly = true)
  public List<DigitalResourceResponseDTO> findAll() {
    return digitalResourcesRepository.findAllWithImages()
      .stream()
      .map(digitalResourceMapper::toDTO)
      .collect(Collectors.toList());
  }

  @Override
  @Transactional
  public DigitalResourceResponseDTO update(Long id, DigitalResourceRequestDTO digitalResourceDTO, UserEntity currentUser) {
    DigitalResourcesEntity resource = findIfOwnerOrThrow(id, currentUser);

    if (digitalResourceDTO.title() != null) {
      resource.setTitle(digitalResourceDTO.title());
    }
    if (digitalResourceDTO.description() != null) {
      resource.setDescription(digitalResourceDTO.description());
    }
    if (digitalResourceDTO.category() != null) {
      resource.setCategory(digitalResourceDTO.category());
    }
    if (digitalResourceDTO.type() != null) {
      resource.setType(digitalResourceDTO.type());
    }
    if (digitalResourceDTO.link() != null) {
      resource.setLink(digitalResourceDTO.link());
    }

    return digitalResourceMapper.toDTO(digitalResourcesRepository.save(resource));
  }

  @Override
  @Transactional
  public void delete(Long id, UserEntity currentUser) {
    DigitalResourcesEntity resource = findIfOwnerOrThrow(id, currentUser);
    digitalResourcesRepository.delete(resource);
  }

  private DigitalResourcesEntity findIfOwnerOrThrow(Long id, UserEntity user) {
    DigitalResourcesEntity resource = digitalResourcesRepository.findById(id).orElseThrow(
        () -> new ResourceNotFoundException("cannot find resource with id: " + id)
    );

    PsychologistEntity psychologist = resource.getPsychologist();
    if (psychologist == null || !psychologist.getId().equals(user.getId())) {
        throw new UnauthorizedAccessException("User can't access this resource because it's not the owner");
    }
    return resource;
  }

}
