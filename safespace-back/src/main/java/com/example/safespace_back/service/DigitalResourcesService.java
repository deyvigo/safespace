package com.example.safespace_back.service;

import java.util.List;

import com.example.safespace_back.dto.in.DigitalResourceRequestDTO;
import com.example.safespace_back.dto.out.DigitalResourceResponseDTO;
import com.example.safespace_back.model.UserEntity;

public interface DigitalResourcesService {

  DigitalResourceResponseDTO save(DigitalResourceRequestDTO digitalResourceDTO, UserEntity user);
  DigitalResourceResponseDTO findById(Long id);
  List<DigitalResourceResponseDTO> findAll();
  DigitalResourceResponseDTO update(Long id, DigitalResourceRequestDTO digitalResourceDTO, UserEntity user);
  void delete(Long id, UserEntity user);

}
