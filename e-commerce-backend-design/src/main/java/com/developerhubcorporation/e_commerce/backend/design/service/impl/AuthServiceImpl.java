package com.developerhubcorporation.e_commerce.backend.design.service.impl;

import com.developerhubcorporation.e_commerce.backend.design.dto.JwtResponseDTO;
import com.developerhubcorporation.e_commerce.backend.design.dto.LoginRequestDTO;
import com.developerhubcorporation.e_commerce.backend.design.dto.SignupRequestsDTO;
import com.developerhubcorporation.e_commerce.backend.design.exception.DuplicateResourceException;
import com.developerhubcorporation.e_commerce.backend.design.model.Role;
import com.developerhubcorporation.e_commerce.backend.design.model.User;
import com.developerhubcorporation.e_commerce.backend.design.repository.RoleRepository;
import com.developerhubcorporation.e_commerce.backend.design.repository.UserRepository;
import com.developerhubcorporation.e_commerce.backend.design.security.UserDetailsImpl;
import com.developerhubcorporation.e_commerce.backend.design.security.jwt.JwtUtils;
import com.developerhubcorporation.e_commerce.backend.design.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils  jwtUtils;

    @Override
    public JwtResponseDTO login(LoginRequestDTO dto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        log.info("User '{}' authenticated successfully", dto.getUsername());
        return buildJwtResponse(authentication);
    }

    @Override
    public JwtResponseDTO registerUser(SignupRequestsDTO dto) {
        if(userRepo.existsByUsername(dto.getUsername())) {
            throw new DuplicateResourceException("Username '" + dto.getUsername() + "' already exists");
        }

        if(userRepo.existsByEmail(dto.getEmail())) {
            throw new DuplicateResourceException("Email '" + dto.getEmail() + "' is already registered.");
        }

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRoles(resolveRoles(dto.getRole()));

        userRepo.save(user);
        log.info("New user '{}' registered successfully", user.getUsername());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return buildJwtResponse(authentication);

    }

    //Helper methode
    /**
     * Build the standard JWT response from an authenticated principal.
     * Centralised here so login() and register() always return an identical shape.
     */
    private JwtResponseDTO buildJwtResponse(Authentication authentication) {
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return new JwtResponseDTO(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles
        );
    }

    /**
     * Map a set of raw role strings from the request payload to managed
     * Role entities, creating them in the DB if they don't already exist.
     *
     * Accepted input values (case-insensitive): "user", "admin",
     * "ROLE_USER", "ROLE_ADMIN". Defaults to ROLE_USER for null/empty/unknown.
     */
    private Set<Role> resolveRoles (Set<String> requestedRoles) {
        Set<Role> roles = new HashSet<>();

        if(requestedRoles == null || requestedRoles.isEmpty()) {
            roles.add(fetchOrCreateRole("ROLE_USER"));
            return roles;
        }

        for (String rawRole : requestedRoles) {
            if(rawRole == null || rawRole.isEmpty()) continue;

            String normalized = rawRole.trim().toUpperCase().replace("ROLE_", "");

            if("ADMIN". equals(normalized)) {
                roles.add(fetchOrCreateRole("ROLE_ADMIN"));
            } else {
                roles.add(fetchOrCreateRole("ROLE_USER"));
            }
        }

        //fallback if every entry was blank/unrecognized, default to USER
        if(roles.isEmpty()) {
            roles.add(fetchOrCreateRole("ROLE_USER"));
        }

        return roles;
    }

    /**
     * Return the existing Role from the database, or persist a new one.
     * In production the DatabaseSeeder pre-seeds both roles on startup,
     * so the orElseGet path should rarely be hit.
     */
    private Role fetchOrCreateRole(String roleName) {
        return roleRepo.findByName(roleName).orElseGet(() -> {
            log.warn("Role '{}' was missing from the DB - creating it. Verify DatabaseSeeder ran correctly.", roleName);
            return roleRepo.save(new Role(roleName));
        });
    }

}
