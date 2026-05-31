package com.developerhubcorporation.e_commerce.backend.design.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Product name cannot be empty or blank") // Validation safeguard
    @Size(max = 150, message = "Product name cannot exceed 150 characters")
    @Column(nullable = false, length = 150) // Matches database constraint mapping
    private String name;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Price cannot be less then 0.0")
    @Column(nullable = false) // Use double or BigDecimal with explicit scale matching
    private Double price;

    @NotBlank(message = "Price is required")
    @Size(max = 50, message = "Category name cannot exceed 50 characters")
    @Column(nullable = false, length = 50)
    private String category;

    @NotBlank
    @Size(max = 1000,message = "Description cannot exceed 1000 characters")
    @Column(nullable = false, length = 1000)
    private String description;

    @NotBlank
    @Size(max = 500, message = "Image URL string is too long")
    @Column(nullable = false, length = 500)
    private String image;

    @NotNull(message = "Stock quantity is required")
    @Min(value = 0, message = "Stock cannot be negative")
    @Column(nullable = false)
    private Integer stock;

}
