package com.developerhubcorporation.e_commerce.backend.design.controller;

import com.developerhubcorporation.e_commerce.backend.design.dto.JwtResponseDTO;
import com.developerhubcorporation.e_commerce.backend.design.dto.LoginRequestDTO;
import com.developerhubcorporation.e_commerce.backend.design.repository.RoleRepository;
import com.developerhubcorporation.e_commerce.backend.design.repository.UserRepository;
import com.developerhubcorporation.e_commerce.backend.design.security.UserDetailsImpl;
import com.developerhubcorporation.e_commerce.backend.design.security.jwt.JwtUtils;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600) // Allow frontend React app to communicate with this controller safely
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    //user sign-in endpoint
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {

        //Authenticate the user credentials using spring's core manager
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(), loginRequestDTO.getPassword()));

        //set the current authentication context thread
        SecurityContextHolder.getContext().setAuthentication(authentication);

        //generate a crisp JWT security token string
        String jwt = jwtUtils.generateJwtToken(authentication);

        // get user profile details to send back to the frontend dashboard configuration
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponseDTO(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

}
