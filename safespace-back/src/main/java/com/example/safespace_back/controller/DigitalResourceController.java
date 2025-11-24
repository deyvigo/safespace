package com.example.safespace_back.controller;


import java.util.List;

import com.example.safespace_back.model.DigitalResourcesEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.example.safespace_back.dto.in.DigitalResourceRequestDTO;
import com.example.safespace_back.dto.out.DigitalResourceResponseDTO;
import com.example.safespace_back.model.UserEntity;
import com.example.safespace_back.service.DigitalResourcesService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/digital-resources")
@RequiredArgsConstructor
public class DigitalResourceController {

  private final DigitalResourcesService digitalResourcesService;

  @PostMapping
  public ResponseEntity<DigitalResourceResponseDTO> createResource(
      @Valid @RequestBody DigitalResourceRequestDTO createDTO,
      @AuthenticationPrincipal UserEntity currentUser
  ) {
    DigitalResourceResponseDTO resource = digitalResourcesService.save(createDTO, currentUser);
    return ResponseEntity.status(HttpStatus.CREATED).body(resource);
  }

  @GetMapping
  public ResponseEntity<Page<DigitalResourceResponseDTO>> getAllResources(
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "5") int size,
          @RequestParam(required = false) Long type,
          @RequestParam(required = false) Long category
  ) {
      Pageable pageable = PageRequest.of(page, size);
      Page<DigitalResourceResponseDTO> resources = digitalResourcesService.findAll(pageable,type,category);
    return ResponseEntity.ok(resources);
  }

  @GetMapping("/{id}")
  public ResponseEntity<DigitalResourceResponseDTO> getResourceById(
      @PathVariable Long id
  ) {
    DigitalResourceResponseDTO resource = digitalResourcesService.findById(id);
    return ResponseEntity.ok(resource);
  }

  @GetMapping("/published")
  public ResponseEntity<Page<DigitalResourceResponseDTO>> getResourcesPublished(
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "5") int size,
          @RequestParam(required = false) Long type,
          @RequestParam(required = false) Long category) {
      Pageable pageable = PageRequest.of(page, size);
      Page<DigitalResourceResponseDTO> resource = digitalResourcesService.findAllPublished(pageable,type,category);
      return ResponseEntity.ok(resource);
  }

  @GetMapping("/me")
  public ResponseEntity<Page<DigitalResourceResponseDTO>> getNyResources(
          @AuthenticationPrincipal UserEntity currentUser,
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "5") int size,
          @RequestParam(required = false) Long type,
          @RequestParam(required = false) Long category
  ) {
      Pageable pageable = PageRequest.of(page, size);
      Page<DigitalResourceResponseDTO> resource = digitalResourcesService.findAllMe(currentUser,pageable,type,category);
      return ResponseEntity.ok(resource);
  }

  @GetMapping("/pending")
  public ResponseEntity<Page<DigitalResourceResponseDTO>> getPendingOthersResources(
          @AuthenticationPrincipal UserEntity currentUser,
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "5") int size,
          @RequestParam(required = false) Long type,
          @RequestParam(required = false) Long category
  ) {
      Pageable pageable = PageRequest.of(page, size);
      Page<DigitalResourceResponseDTO> resource = digitalResourcesService.findAllNotPublished(currentUser,pageable,type,category);
      return ResponseEntity.ok(resource);
  }

  @PutMapping("/publish/{id}")
  public ResponseEntity<Void> publishResource(
      @PathVariable Long id,
      @AuthenticationPrincipal UserEntity currentUser
  ) {
      digitalResourcesService.publish(id,currentUser);
      return ResponseEntity.noContent().build();
  }

  @PutMapping("/unpublish/{id}")
  public ResponseEntity<Void> unpublishResource(
          @PathVariable Long id
  ) {
      digitalResourcesService.unPublish(id);
      return ResponseEntity.noContent().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<DigitalResourceResponseDTO> updateResource(
      @PathVariable Long id,
      @Valid @RequestBody DigitalResourceRequestDTO updateDTO,
      @AuthenticationPrincipal UserEntity currentUser
  ) {
    DigitalResourceResponseDTO updatedResource = digitalResourcesService.update(id, updateDTO, currentUser);
    return ResponseEntity.ok(updatedResource);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteResource(
      @PathVariable Long id,
      @AuthenticationPrincipal UserEntity currentUser
  ) {
    digitalResourcesService.delete(id, currentUser);
    return ResponseEntity.noContent().build();
  }
}
