package com.developerhub.ecommerce.backend.design.service.impl;

import com.developerhub.ecommerce.backend.design.model.Product;
import com.developerhub.ecommerce.backend.design.repository.ProductRepository;
import com.developerhub.ecommerce.backend.design.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepo;

    @Override
    public Product save(Product product) {

       Product savedProduct = new  Product();

       savedProduct.setName(product.getName());
       savedProduct.setCategory(product.getCategory());
       savedProduct.setDescription(product.getDescription());
       savedProduct.setPrice(product.getPrice());
       savedProduct.setStock(product.getStock());
       savedProduct.setImage(product.getImage());

       return productRepo.save(savedProduct);
    }
}
