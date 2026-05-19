package com.developerhubcorporation.e_commerce.backend.design.service;

import com.developerhubcorporation.e_commerce.backend.design.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    Product save(Product product);

    Product getById(Long id);

    Page<Product> findAll(Pageable pageable);

    Page<Product> getFilteredProducts(String search, String category, int page, int size);
}
