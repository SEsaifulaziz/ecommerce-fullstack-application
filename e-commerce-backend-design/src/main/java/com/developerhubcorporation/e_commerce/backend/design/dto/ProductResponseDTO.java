package com.developerhubcorporation.e_commerce.backend.design.dto;

import com.developerhubcorporation.e_commerce.backend.design.model.Product;
import lombok.Data;

@Data
public class ProductResponseDTO {

    private Long id;
    private String name;
    private Double price;
    private String category;
    private String description;
    private String image;
    private Integer stock;
}
