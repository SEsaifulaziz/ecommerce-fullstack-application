package com.developerhubcorporation.e_commerce.backend.design.controller;

import com.developerhubcorporation.e_commerce.backend.design.dto.JwtResponseDTO;
import com.developerhubcorporation.e_commerce.backend.design.dto.LoginRequestDTO;
import com.developerhubcorporation.e_commerce.backend.design.dto.SignupRequestsDTO;
import com.developerhubcorporation.e_commerce.backend.design.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * POST /api/v1/auth/login
     * Authenticate an existing user and return a JWT.
     */
    @PostMapping("/login")
    public ResponseEntity<JwtResponseDTO> login(@Valid @RequestBody LoginRequestDTO dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    /**
     * POST /api/v1/auth/register
     * Create a new account and return a JWT immediately (no second login call needed).
     * DuplicateResourceException is handled by GlobalExceptionHandler → 409.
     */
    @PostMapping("/register")
    public ResponseEntity<JwtResponseDTO> register(@Valid @RequestBody SignupRequestsDTO dto) {
        return ResponseEntity.ok(authService.registerUser(dto));
    }


    /**
     * POST /api/v1/auth/logout
     * Stateless signal — the JWT is not server-side invalidated (stateless JWT design).
     * The client is responsible for discarding the token on receipt of this response.
     * Security context is cleared server-side as a best-effort cleanup.
     */
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}
