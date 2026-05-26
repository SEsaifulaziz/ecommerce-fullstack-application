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
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity // Tells Spring to apply our custom security filters globally
@EnableMethodSecurity // Allows us to use annotations like @PreAuthorize("hasRole('ADMIN')") on controllers later
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsService;
    private final AuthEntryPointJwt  unauthorizedHandler;
    private final AuthTokenFilter authTokenFilter;
    private final CorsConfigurationSource corsConfigurationSource;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //Establish the Authentication Provider linking our custom DB Service & BCrypt Encoder
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                // Disable CSRF protection (not needed for stateless REST APIs using JWT tokens)
                .csrf(csrf -> csrf.disable())

                // Assign our custom unauthorized request interception exception checkpoint
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))

                // Force the server to be completely STATELESS (Never create na HTTP Session)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Define API route visibility permission
                .authorizeHttpRequests(auth -> auth
                        // Allow anyone to attempt registration or login operations
                        .requestMatchers("/api/v1/auth/**").permitAll()

                        // Allow anyone to attempt to read or query products (Customers browsing the shop)
                        .requestMatchers(HttpMethod.GET, "/api/v1/products/**").permitAll()

                        // Any other request (like updating, adding, or deleting products) requires a valid user login
                        .anyRequest().authenticated()
                );

        //tell spring security to utilize our authentication provider credentials logic
        http.authenticationProvider(authenticationProvider());

        // inject our custom JWT validation filter right BEFORE the standard UsernamePassword filter runs
        http.addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
