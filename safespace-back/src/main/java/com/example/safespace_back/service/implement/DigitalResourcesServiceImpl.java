package com.example.safespace_back.service.implement;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Base64;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import com.example.safespace_back.dto.out.ImageMetadataDTO;
import com.example.safespace_back.specifications.DigitalResourcesSpecs;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.safespace_back.dto.in.DigitalResourceRequestDTO;
import com.example.safespace_back.dto.out.DigitalResourceResponseDTO;
import com.example.safespace_back.exception.ResourceNotFoundException;
import com.example.safespace_back.exception.IncorrectFormatImageException;
import com.example.safespace_back.exception.ImagesExceedException;
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

  private boolean validateImageExtension(String base64){
      return  base64.startsWith("data:image/webp") && base64.contains(";base64,");
  }

  @Override
  @Transactional
  public DigitalResourceResponseDTO save(DigitalResourceRequestDTO digitalResourceDTO, UserEntity currentUser) {
    if (!(currentUser instanceof PsychologistEntity)) {
      throw new ResourceNotFoundException("El usuario con ID " + currentUser.getId() + " no es un psicólogo");
    }

    if(digitalResourceDTO.images() != null && digitalResourceDTO.images().size() > 3){
        throw new ImagesExceedException("La cantidad máxima de imágenes permitida fue excedida");
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

        for (ImageMetadataDTO img : digitalResourceDTO.images()) {
            if (img.public_URL() != null){
                if(validateImageExtension(img.public_URL())){
                    ImageMetadataEntity newImg = imageMetadataService.uploadAndCreate(img.public_URL(), entity);
                    imageEntities.add(newImg);
                }else{
                    throw new IncorrectFormatImageException("Formato incorrecto en una de las imágenes");
                }
            }
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
  public Page<DigitalResourceResponseDTO> findAll(Pageable pageable,Long type,Long category) {
      Specification<DigitalResourcesEntity> spec = Specification.allOf(DigitalResourcesSpecs.fetchImages(),DigitalResourcesSpecs.hasType(type),DigitalResourcesSpecs.hasCategory(category));
    return digitalResourcesRepository.findAll(spec, pageable).map(digitalResourceMapper::toDTO);
  }

  @Override
  @Transactional(readOnly = true)
  public Page<DigitalResourceResponseDTO> findAllMe(UserEntity currentUser,Pageable pageable,Long type,Long category) {
      if (!(currentUser instanceof PsychologistEntity me)) {
          throw new ResourceNotFoundException("El usuario con ID " + currentUser.getId() + " no es un psicólogo");
      }
      Specification<DigitalResourcesEntity> spec = Specification.allOf(DigitalResourcesSpecs.fetchImages(),DigitalResourcesSpecs.hasOwner(me.getId()),DigitalResourcesSpecs.hasType(type),DigitalResourcesSpecs.hasCategory(category));
      return digitalResourcesRepository.findAll(spec, pageable)
              .map(digitalResourceMapper::toDTO);
  }

  @Override
  @Transactional(readOnly = true)
  public Page<DigitalResourceResponseDTO> findAllNotPublished(UserEntity currentUser,Pageable pageable,Long type,Long category) {
      if (!(currentUser instanceof PsychologistEntity me)) {
          throw new ResourceNotFoundException("El usuario con ID " + currentUser.getId() + " no es un psicólogo");
      }
      Specification<DigitalResourcesEntity> spec = Specification.allOf(DigitalResourcesSpecs.fetchImages(),DigitalResourcesSpecs.hasPublished(false),DigitalResourcesSpecs.isNotOwner(me.getId()),DigitalResourcesSpecs.hasType(type),DigitalResourcesSpecs.hasCategory(category));
      return digitalResourcesRepository.findAll(spec,pageable)
              .map(digitalResourceMapper::toDTO);
  }

  @Override
  @Transactional(readOnly = true)
  public Page<DigitalResourceResponseDTO> findAllPublished(Pageable pageable,Long type,Long category) {
      Specification<DigitalResourcesEntity> spec = Specification.allOf(DigitalResourcesSpecs.fetchImages(),DigitalResourcesSpecs.hasPublished(true),DigitalResourcesSpecs.hasType(type),DigitalResourcesSpecs.hasCategory(category));
      return digitalResourcesRepository.findAll(spec,pageable)
              .map(digitalResourceMapper::toDTO);
  }

  @Override
  @Transactional
  public DigitalResourceResponseDTO update(Long id, DigitalResourceRequestDTO digitalResourceDTO, UserEntity currentUser) {

      if(digitalResourceDTO.images() != null && digitalResourceDTO.images().size() > 3){
          throw new ImagesExceedException("La cantidad máxima de imágenes permitida fue excedida");
      }

    DigitalResourcesEntity resource = findIfOwnerOrThrow(id, currentUser);

      if(resource.isPublished()){
          throw new UnauthorizedAccessException("Este recurso se encuentra publicado y no es editable");
      }

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

    List<String> savedImagesIDs = new ArrayList<>();
    List<String> newImgs = new ArrayList<>();
    List<ImageMetadataEntity> existing = resource.getImages();

    if (digitalResourceDTO.images() != null && !digitalResourceDTO.images().isEmpty()) {
        for (ImageMetadataDTO img : digitalResourceDTO.images()) {
              if (img.public_URL() != null && img.publicID() == null){
                  if(validateImageExtension(img.public_URL())){
                      newImgs.add(img.public_URL());
                  }else{
                      throw new IncorrectFormatImageException("Formato incorrecto en una de las imágenes");
                  }
              }else{
                  if(!Objects.equals(img.publicID(), "")){
                      savedImagesIDs.add(img.publicID());
                  }
              }
        }
    }

    List<ImageMetadataEntity> copy = new ArrayList<>(existing);

    for (ImageMetadataEntity image : copy) {
        if (image.getPublicID() != null) {
            if (!savedImagesIDs.contains(image.getPublicID())) {
                existing.remove(image);
                imageMetadataService.deleteImage(image.getPublicID());
            }
        }
    }

    for (String base64 : newImgs){
        ImageMetadataEntity newImg = imageMetadataService.uploadAndCreate(base64, resource);
        existing.add(newImg);
    }

    return digitalResourceMapper.toDTO(digitalResourcesRepository.save(resource));
  }

  @Override
  @Transactional
  public void delete(Long id, UserEntity currentUser) {
    DigitalResourcesEntity resource = findIfOwnerOrThrow(id, currentUser);
      if (resource.getImages() != null && !resource.getImages().isEmpty()) {
          for (ImageMetadataEntity image : resource.getImages()) {
              if(image.getPublicID() != null){
                  imageMetadataService.deleteImage(image.getPublicID());
              }
          }
      }
    digitalResourcesRepository.delete(resource);
  }

  @Override
  @Transactional
  public void publish(Long id, UserEntity currentUser) {
      DigitalResourcesEntity resource = findIfNotOwnerOrThrow(id, currentUser);
      resource.setPublished(true);
  }

  @Override
  @Transactional
  public void unPublish(Long id) {
      DigitalResourcesEntity resource = digitalResourcesRepository.findById(id).orElseThrow(
              () -> new ResourceNotFoundException("cannot find resource with id: " + id)
      );
      resource.setPublished(false);
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

  private DigitalResourcesEntity findIfNotOwnerOrThrow(Long id, UserEntity user) {
      DigitalResourcesEntity resource = digitalResourcesRepository.findById(id).orElseThrow(
              () -> new ResourceNotFoundException("cannot find resource with id: " + id)
      );

      PsychologistEntity psychologist = resource.getPsychologist();
      if (psychologist == null || psychologist.getId().equals(user.getId())) {
          throw new UnauthorizedAccessException("User can't access this resource because it's the owner");
      }
      return resource;
  }

}
