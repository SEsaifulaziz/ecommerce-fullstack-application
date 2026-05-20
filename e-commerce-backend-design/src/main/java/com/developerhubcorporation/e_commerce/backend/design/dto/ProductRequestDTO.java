package com.developerhubcorporation.e_commerce.backend.design.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProductRequestDTO {

    @NotBlank(message = "Product name cannot be empty or black")
    @Size(max = 150, message = "Product name cannot exceed 150 characters")
    private String name;

    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price cannot be less than 0")
    private Double price;

    @NotBlank(message = "Category is required")
    @Size(max = 50, message = "Category name cannot exceed 50 characters")
    private String category;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    @Size(max = 500, message = "Image URL string is too long")
    private String image;

    @NotNull(message = "Stock quantity is required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;
}
