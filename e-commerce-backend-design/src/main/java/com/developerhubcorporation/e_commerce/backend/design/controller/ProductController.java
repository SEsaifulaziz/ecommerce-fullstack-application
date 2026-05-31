package com.developerhubcorporation.e_commerce.backend.design.controller;


import com.developerhubcorporation.e_commerce.backend.design.dto.ProductRequestDTO;
import com.developerhubcorporation.e_commerce.backend.design.dto.ProductResponseDTO;
import com.developerhubcorporation.e_commerce.backend.design.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductResponseDTO> createProduct(
            @Valid @RequestBody ProductRequestDTO dto
    ) {
        log.info("REST request to save Product : {}", dto.getName());
        ProductResponseDTO savedProduct = productService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(
            @PathVariable Long id
    ) {
        log.info("REST request to get Product by ID : {}", id);
        ProductResponseDTO getById = productService.getById(id);
        return ResponseEntity.ok().body(getById);
    }

    @GetMapping()
    public ResponseEntity<Page<ProductResponseDTO>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        log.info("REST request to get a paginated list of Products");
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok().body(productService.findAll(pageable));
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<ProductResponseDTO>> getFilteredProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false, defaultValue = "0")  int page,
            @RequestParam(required = false, defaultValue = "10") int size
    ) {
        log.info("REST request to filter Products - Search: {}, category: {}", search, category);
        Page<ProductResponseDTO> filteredProducts = productService.getFilteredProducts(search, category, page, size);
        return ResponseEntity.ok().body(filteredProducts);
    }

}
