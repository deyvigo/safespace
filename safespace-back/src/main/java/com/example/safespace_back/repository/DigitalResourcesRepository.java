package com.example.safespace_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.safespace_back.model.DigitalResourcesEntity;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DigitalResourcesRepository extends JpaRepository<DigitalResourcesEntity, Long> , JpaSpecificationExecutor<DigitalResourcesEntity> {

}
