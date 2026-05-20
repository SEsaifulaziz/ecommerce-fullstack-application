package com.developerhubcorporation.e_commerce.backend.design.service;

import com.developerhubcorporation.e_commerce.backend.design.dto.ProductRequestDTO;
import com.developerhubcorporation.e_commerce.backend.design.dto.ProductResponseDTO;
import com.developerhubcorporation.e_commerce.backend.design.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    ProductResponseDTO save(ProductRequestDTO product);

    ProductResponseDTO getById(Long id);

    Page<ProductResponseDTO> findAll(Pageable pageable);

    Page<ProductResponseDTO> getFilteredProducts(String search, String category, int page, int size);
}
