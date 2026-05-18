package com.developerhub.ecommerce.backend.design.service.impl;

import com.developerhub.ecommerce.backend.design.model.Product;
import com.developerhub.ecommerce.backend.design.repository.ProductRepository;
import com.developerhub.ecommerce.backend.design.service.ProductService;
import jakarta.persistence.EntityNotFoundException;
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

    @Override
    public Product getById(Long id) {
        Product product = productRepo.findById(id).orElse(null);
        if(product == null){
            throw new EntityNotFoundException("Product not found");
        }
        return product;
    }
}
