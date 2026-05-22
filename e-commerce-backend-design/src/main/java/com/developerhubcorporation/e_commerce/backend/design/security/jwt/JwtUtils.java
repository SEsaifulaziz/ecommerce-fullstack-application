package com.developerhubcorporation.e_commerce.backend.design.security.jwt;

import com.developerhubcorporation.e_commerce.backend.design.security.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
@Slf4j
public class JwtUtils {

    @Value("${ecommerce.app.jwtSecretKey}")
    private String jwtSecret;

    @Value("${ecommerce.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    // Generate JWT Token for an authenticated user
    public String generateJwtToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date().getTime() + jwtExpirationMs)))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Helper method to decode our base64-configured secret key string safely
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Extract username from the verified token string
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    //Validate Token authenticity and expiration boundaries
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey()).build().parseClaimsJws(authToken);
            return true;
        } catch(MalformedJwtException ex){
            log.error("Invalid JWT token format: {}",  ex.getMessage());
        } catch(ExpiredJwtException ex){
            log.error("Expired JWT token format: {}", ex.getMessage());
        } catch(UnsupportedJwtException ex){
            log.error("JWT token has expired: {}",  ex.getMessage());
        } catch(IllegalArgumentException ex){
            log.error("JWT claims string is empty or blank: {}", ex.getMessage());
        }
        return false;
    }
}
