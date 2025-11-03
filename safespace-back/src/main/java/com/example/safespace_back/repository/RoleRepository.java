package com.example.safespace_back.repository;

import com.example.safespace_back.model.Role;
import com.example.safespace_back.model.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    Optional<RoleEntity> findByRole(Role role);
}
