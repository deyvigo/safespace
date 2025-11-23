package com.example.safespace_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.safespace_back.model.DigitalResourcesEntity;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface DigitalResourcesRepository extends JpaRepository<DigitalResourcesEntity, Long> {

    @Query("SELECT dr FROM DigitalResourcesEntity dr LEFT JOIN FETCH dr.images")
    List<DigitalResourcesEntity> findAllWithImages();

}
