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
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
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

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequestsDTO signupRequestsDTO){

        //Validation check: ensure username is unique
        if(userRepo.existsByUsername(signupRequestsDTO.getUsername())){
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        // validation check: ensure email is unique
        if(userRepo.existsByEmail(signupRequestsDTO.getEmail())){
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // create a new user raw object
        User user = new User();
        user.setUsername(signupRequestsDTO.getUsername());
        user.setEmail(signupRequestsDTO.getEmail());

        // cryptographically scramble the plain text password before persistent saving
        user.setPassword(passwordEncoder.encode(signupRequestsDTO.getPassword()));

        Set<String> strRoles = signupRequestsDTO.getRole();
        Set<Role> roles = new HashSet<>();

        if(strRoles == null){
            //default rule: if no role is required, assign standard user level permissions
            Role userRole = roleRepo.findByName("ROLE_USER")
                    .orElseThrow(() -> new RuntimeException("Error: Role 'ROLE_USER' is not initialized in the database."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {

                //defensive cleaning: convert to lower case and completely strip accidental spaces
                String cleanedRole = role.trim().toLowerCase();

                switch (cleanedRole) {
                    case "admin":
                        Role adminRole = roleRepo.findByName("ROLE_ADMIN")
                                .orElseThrow(() -> new RuntimeException("Error: Role 'ROLE_ADMIN' is not initialized in the database."));
                        roles.add(adminRole);
                        break;
                    default:
                        Role userRole = roleRepo.findByName("ROLE_USER")
                                .orElseThrow(() -> new RuntimeException("Error: Role 'ROLE_USER' is not initialized int the database."));
                        roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        userRepo.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

}
