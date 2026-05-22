package com.developerhubcorporation.e_commerce.backend.design.dto;

import com.developerhubcorporation.e_commerce.backend.design.model.Role;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class JwtResponseDTO {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private List<String> roles;


    public JwtResponseDTO(String accessToken, Long id,
                          String username,
                          String email,
                          List<String> roles) {

        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;

    }
}
