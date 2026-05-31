package com.developerhubcorporation.e_commerce.backend.design.service;

import com.developerhubcorporation.e_commerce.backend.design.dto.JwtResponseDTO;
import com.developerhubcorporation.e_commerce.backend.design.dto.LoginRequestDTO;
import com.developerhubcorporation.e_commerce.backend.design.dto.SignupRequestsDTO;

public interface AuthService {
    JwtResponseDTO  authenticateUser(LoginRequestDTO dto);
    JwtResponseDTO registerUser(SignupRequestsDTO dto);
    void logoutUser();
}
