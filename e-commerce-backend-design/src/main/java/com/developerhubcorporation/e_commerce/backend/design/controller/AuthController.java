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
import java.util.Map;
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

    // -------------------------------------------------------------------------
    // POST /api/v1/auth/login
    // -------------------------------------------------------------------------
    @PostMapping("/login")
    public ResponseEntity<JwtResponseDTO> authenticateUser(@Valid @RequestBody LoginRequestDTO dto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        log.info("User '{}' logged in successfully", userDetails.getUsername());
        return ResponseEntity.ok(new JwtResponseDTO(jwt, userDetails.getId(),
                userDetails.getUsername(), userDetails.getEmail(), roles));
    }

    // -------------------------------------------------------------------------
    // POST /api/v1/auth/register
    // FIX: Returns a JwtResponseDTO directly — no need for the frontend to call
    //      login() as a second round-trip after a successful registration.
    // -------------------------------------------------------------------------
    @PostMapping("/register")
    @Transactional
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequestsDTO dto) {
        if (userRepo.existsByUsername(dto.getUsername())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username is already taken."));
        }
        if (userRepo.existsByEmail(dto.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is already in use."));
        }

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRoles(resolveRoles(dto.getRole()));
        userRepo.save(user);

        log.info("New user registered: {}", user.getUsername());

        // Auto-login after registration — returns the JWT immediately
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponseDTO(jwt, userDetails.getId(),
                userDetails.getUsername(), userDetails.getEmail(), roles));
    }

    // -------------------------------------------------------------------------
    // POST /api/v1/auth/logout  (stateless signal — client must discard token)
    // -------------------------------------------------------------------------
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logoutUser() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(Map.of("message", "Logged out successfully."));
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------
    private Set<Role> resolveRoles(Set<String> requestedRoles) {
        Set<Role> roles = new HashSet<>();

        if (requestedRoles == null || requestedRoles.isEmpty()) {
            roles.add(getOrCreateRole("ROLE_USER"));
            return roles;
        }

        for (String roleValue : requestedRoles) {
            if (roleValue == null || roleValue.isBlank()) continue;

            String normalized = roleValue.trim().toUpperCase().replace("ROLE_", "");
            if ("ADMIN".equals(normalized)) {
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
        return roleRepo.findByName(roleName).orElseGet(() -> {
            log.warn("Role '{}' not found in DB — creating it now. Check DatabaseSeeder.", roleName);
            return roleRepo.save(new Role(roleName));
        });
    }
}
