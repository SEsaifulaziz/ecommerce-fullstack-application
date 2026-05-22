package com.developerhubcorporation.e_commerce.backend.design.dto;

import com.developerhubcorporation.e_commerce.backend.design.model.Role;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
public class JwtResponseDTO {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private Set<Role> roles;


    public JwtResponseDTO(String token, Long id,
                          String username,
                          String email,
                          Set<Role> roles) {
        
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;

    }
}
