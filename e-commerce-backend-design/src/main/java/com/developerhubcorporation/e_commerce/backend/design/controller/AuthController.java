package com.developerhubcorporation.e_commerce.backend.design.controller;

import com.developerhubcorporation.e_commerce.backend.design.dto.JwtResponseDTO;
import com.developerhubcorporation.e_commerce.backend.design.dto.LoginRequestDTO;
import com.developerhubcorporation.e_commerce.backend.design.dto.SignupRequestsDTO;
import com.developerhubcorporation.e_commerce.backend.design.model.Role;
import com.developerhubcorporation.e_commerce.backend.design.model.User;
import com.developerhubcorporation.e_commerce.backend.design.repository.RoleRepository;
import com.developerhubcorporation.e_commerce.backend.design.repository.UserRepository;
import com.developerhubcorporation.e_commerce.backend.design.security.UserDetailsImpl;
import com.developerhubcorporation.e_commerce.backend.design.security.jwt.JwtUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDTO.getUsername(),
                        loginRequestDTO.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponseDTO(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/register")
    @Transactional
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequestsDTO signupRequestsDTO) {
        if (userRepo.existsByUsername(signupRequestsDTO.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        if (userRepo.existsByEmail(signupRequestsDTO.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User user = new User();
        user.setUsername(signupRequestsDTO.getUsername());
        user.setEmail(signupRequestsDTO.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequestsDTO.getPassword()));
        user.setRoles(resolveRoles(signupRequestsDTO.getRole()));

        userRepo.save(user);
        log.info("Registered user: {}", user.getUsername());

        return ResponseEntity.ok("User registered successfully!");
    }

    private Set<Role> resolveRoles(Set<String> requestedRoles) {
        Set<Role> roles = new HashSet<>();

        if (requestedRoles == null || requestedRoles.isEmpty()) {
            roles.add(getOrCreateRole("ROLE_USER"));
            return roles;
        }

        for (String roleValue : requestedRoles) {
            if (roleValue == null || roleValue.isBlank()) {
                continue;
            }

            String cleaned = roleValue.trim().toLowerCase().replace("role_", "");

            if (cleaned.equals("admin")) {
                roles.add(getOrCreateRole("ROLE_ADMIN"));
            } else {
                roles.add(getOrCreateRole("ROLE_USER"));
            }
        }

        if (roles.isEmpty()) {
            roles.add(getOrCreateRole("ROLE_USER"));
        }

        return roles;
    }

    private Role getOrCreateRole(String roleName) {
        return roleRepo.findByName(roleName)
                .orElseGet(() -> {
                    log.info("Creating missing role: {}", roleName);
                    return roleRepo.save(new Role(roleName));
                });
    }
}
