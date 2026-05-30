package com.developerhubcorporation.e_commerce.backend.design.config;

import com.developerhubcorporation.e_commerce.backend.design.security.UserDetailsServiceImpl;
import com.developerhubcorporation.e_commerce.backend.design.security.jwt.AuthEntryPointJwt;
import com.developerhubcorporation.e_commerce.backend.design.security.jwt.AuthTokenFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Central Spring Security configuration.
 *
 * FIX 1: CORS is now handled exclusively here via the CorsConfigurationSource
 *         bean defined in WebConfig. Removed the duplicate WebMvcConfigurer
 *         CORS registration that was fighting with Spring Security's filter.
 *
 * FIX 2: HTTP OPTIONS (pre-flight) requests are explicitly permitted so the
 *         browser never receives a 401 on its pre-flight check.
 *
 * FIX 3: The /swagger-ui and /v3/api-docs paths are whitelisted so the
 *         OpenAPI docs remain accessible without a token.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsService;
    private final AuthEntryPointJwt unauthorizedHandler;
    private final AuthTokenFilter authTokenFilter;
    private final WebConfig webConfig;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Delegate CORS to our single CorsConfigurationSource bean (fixes the CORS split-brain issue)
                .cors(cors -> cors.configurationSource(webConfig.corsConfigurationSource()))

                // CSRF not needed for stateless JWT REST APIs
                .csrf(csrf -> csrf.disable())

                // Return structured JSON on 401 instead of a redirect to a login page
                .exceptionHandling(ex -> ex.authenticationEntryPoint(unauthorizedHandler))

                // Stateless – never create an HTTP session
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth
                        // Allow browser pre-flight OPTIONS requests on all paths without a token
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Public auth endpoints
                        .requestMatchers("/api/v1/auth/**").permitAll()

                        // Public product reads
                        .requestMatchers(HttpMethod.GET, "/api/v1/products/**").permitAll()

                        // OpenAPI / Swagger UI (useful for testing on Render)
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html").permitAll()

                        // Everything else requires a valid JWT
                        .anyRequest().authenticated()
                );

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
