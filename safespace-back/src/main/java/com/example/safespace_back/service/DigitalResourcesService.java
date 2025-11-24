package com.example.safespace_back.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

import com.example.safespace_back.dto.in.DigitalResourceRequestDTO;
import com.example.safespace_back.dto.out.DigitalResourceResponseDTO;
import com.example.safespace_back.model.UserEntity;

public interface DigitalResourcesService {

  DigitalResourceResponseDTO save(DigitalResourceRequestDTO digitalResourceDTO, UserEntity user);
  DigitalResourceResponseDTO findById(Long id);
  Page<DigitalResourceResponseDTO> findAll(Pageable pageable,Long type,Long category);
  Page<DigitalResourceResponseDTO> findAllMe(UserEntity user, Pageable pageable,Long type,Long category);
  Page<DigitalResourceResponseDTO> findAllNotPublished(UserEntity user, Pageable pageable,Long type,Long category);
  Page<DigitalResourceResponseDTO> findAllPublished(Pageable pageable,Long type,Long category);
  DigitalResourceResponseDTO update(Long id, DigitalResourceRequestDTO digitalResourceDTO, UserEntity user);
  void delete(Long id, UserEntity user);
  void publish(Long id, UserEntity user);
  void unPublish(Long id);

}
