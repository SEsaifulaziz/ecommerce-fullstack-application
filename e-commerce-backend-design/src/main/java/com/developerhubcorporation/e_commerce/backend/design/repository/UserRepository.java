package com.developerhubcorporation.e_commerce.backend.design.repository;

import com.developerhubcorporation.e_commerce.backend.design.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String name);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
