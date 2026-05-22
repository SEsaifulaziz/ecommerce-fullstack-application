package com.developerhubcorporation.e_commerce.backend.design.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @Column(unique = true, nullable = false, length = 50)
    @Email
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles", // Names the new bridge table
            joinColumns = @JoinColumn(name = "user_id"), // Creates the Foreign Key column pointing back to the users table
            inverseJoinColumns = @JoinColumn(name = "role_id") // Creates the Foreign Key column pointing to the roles table
    )
    private Set<Role> roles = new  HashSet<>();

}
