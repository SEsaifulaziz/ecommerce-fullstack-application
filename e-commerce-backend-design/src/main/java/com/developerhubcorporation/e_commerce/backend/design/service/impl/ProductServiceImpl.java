package com.developerhubcorporation.e_commerce.backend.design.service.impl;

import com.developerhubcorporation.e_commerce.backend.design.dto.ProductRequestDTO;
import com.developerhubcorporation.e_commerce.backend.design.dto.ProductResponseDTO;
import com.developerhubcorporation.e_commerce.backend.design.exception.ResourceNotFoundException;
import com.developerhubcorporation.e_commerce.backend.design.mapper.ProductMapper;
import com.developerhubcorporation.e_commerce.backend.design.model.Product;
import com.developerhubcorporation.e_commerce.backend.design.repository.ProductRepository;
import com.developerhubcorporation.e_commerce.backend.design.service.ProductService;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepo;
    private final ProductMapper productMapper;

    @Override
     @Transactional// manages database transaction boundaries for writes
    public ProductResponseDTO save(ProductRequestDTO dto) {
        log.info("Saving new product to database: {}",  dto.getName());

        Product product = productMapper.toEntity(dto);
        Product savedProduct = productRepo.save(product);

        log.info("Product successfully persisted with generated ID: {}", savedProduct.getId());
        return productMapper.toResponseDTO(savedProduct);
    }

    @Override
    @Transactional(readOnly = true) // Optimizes memory/speed for database reads
    public ProductResponseDTO getById(Long id) {
        log.debug("Fetching product by ID: {}", id);

        // Replaced generic EntityNotFoundException with custom ResourceNotFoundException (class created)
        return productRepo.findById(id)
                .map(productMapper::toResponseDTO)
                .orElseThrow(() -> {
                    log.error("Product with ID {} not found", id);
                    return new ResourceNotFoundException("Product not found with id: " + id);
                });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Product> findAll(Pageable pageable) {
        log.debug("Fetching paginated products list from database");
        return productRepo.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Product> getFilteredProducts(String search, String category, int page, int size) {

        log.info("Fetching products by search {}, category {}", search, category);

        Pageable  pageable = PageRequest.of(page, size);

        // Standardized validation logic using trim() safely
        boolean hasSearch = (search != null  && !search.trim().isEmpty());
        boolean hasCategory = (category != null && !category.trim().isEmpty());

        if (hasSearch &&  hasCategory){
            return productRepo.findByNameContainingIgnoreCaseAndCategoryContainingIgnoreCase(search.trim(), category.trim(), pageable);
        }

        else if (hasSearch){
            return productRepo.findByNameContainingIgnoreCase(search.trim(), pageable);
        }

        else if (hasCategory){
            return  productRepo.findByCategoryContainingIgnoreCase(category.trim(), pageable);
        }
        else{
            return productRepo.findAll(pageable);
        }
    }
}
