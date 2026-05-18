package com.developerhub.ecommerce.backend.design.service;


import com.developerhub.ecommerce.backend.design.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    Product save(Product product);

    Product getById(Long id);

    Page<Product> findAll(Pageable pageable);
}
