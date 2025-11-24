package com.example.safespace_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.safespace_back.model.ImageMetadataEntity;
import java.util.List;

public interface ImageMetadataRepository extends JpaRepository<ImageMetadataEntity,Long>{
    List<ImageMetadataEntity> findAllByResourceParent_Id(Long psychologistId);
    void deleteByPublicID(String publicId);
}
