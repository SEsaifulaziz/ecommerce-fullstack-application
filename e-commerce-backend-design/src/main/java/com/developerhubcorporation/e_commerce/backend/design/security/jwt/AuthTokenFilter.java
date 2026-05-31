package com.developerhubcorporation.e_commerce.backend.design.security.jwt;

import com.developerhubcorporation.e_commerce.backend.design.security.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthTokenFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        try {
            // Extract the token from the Authentication header
            String jwt = parseJwt(request);

            // if a token exists and passes validation checks, authorize the session
            if(jwt != null && jwtUtils.validateJwtToken(jwt)) {
                String username = jwtUtils.getUserNameFromJwtToken(jwt);

                // Load the user data from MySQL via the service layer
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // Create a formal authentication certificate object for Spring Security
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                //Place the authentication token inside the global Security Context
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }catch(Exception e) {
            log.error("Cannot set user authentication session: {}", e.getMessage());
        }

        // forward the request down the chain to the next filter or controller
        filterChain.doFilter(request, response);
    }


    // Helper method to pull the bearer token out of the standard HTTP authorization header
    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if(StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7); //Trims away the word "Bearer " to isolate the raw JWT String
        }
        return null;
    }
}
