package com.developerhubcorporation.e_commerce.backend.design.repository;

import com.developerhubcorporation.e_commerce.backend.design.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(Role name);
}
