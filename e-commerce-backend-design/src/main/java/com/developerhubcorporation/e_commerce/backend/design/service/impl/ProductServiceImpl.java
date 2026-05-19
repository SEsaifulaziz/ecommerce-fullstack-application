package com.developerhubcorporation.e_commerce.backend.design.service.impl;

import com.developerhubcorporation.e_commerce.backend.design.model.Product;
import com.developerhubcorporation.e_commerce.backend.design.repository.ProductRepository;
import com.developerhubcorporation.e_commerce.backend.design.service.ProductService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepo;

    @Override
    public Product save(Product product) {

        Product savedProduct = new Product();

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

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return productRepo.findAll(pageable);
    }

    @Override
    public Page<Product> getFilteredProducts(String search, String category, int page, int size) {
        Pageable  pageable = PageRequest.of(page, size);

        // Check if search and category inputs actually have text
        boolean hasSearch = (search != null  && !search.trim().isEmpty());
        boolean hasCategory = (category != null && !category.trim().isEmpty());

        if (hasSearch &&  hasCategory){
            return productRepo.findByNameContainingIgnoreCaseAndCategoryContainingIgnoreCase(search, category, pageable);
        }

        else if (hasSearch){
            return productRepo.findByNameContainingIgnoreCase(search, pageable);
        }

        else if (hasCategory){
            return  productRepo.findByCategoryContainingIgnoreCase(category, pageable);
        }
        else{
            return productRepo.findAll(pageable);
        }
    }
}
