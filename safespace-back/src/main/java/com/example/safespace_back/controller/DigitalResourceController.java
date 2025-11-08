package com.example.safespace_back.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
  public ResponseEntity<List<DigitalResourceResponseDTO>> getAllResources() {
    List<DigitalResourceResponseDTO> resources = digitalResourcesService.findAll();
    return ResponseEntity.ok(resources);
  }

  @GetMapping("/{id}")
  public ResponseEntity<DigitalResourceResponseDTO> getResourceById(
      @PathVariable Long id
  ) {
    DigitalResourceResponseDTO resource = digitalResourcesService.findById(id);
    return ResponseEntity.ok(resource);
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
