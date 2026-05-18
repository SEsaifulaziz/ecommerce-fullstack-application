package com.developerhub.ecommerce.backend.design.controller;


import com.developerhub.ecommerce.backend.design.model.Product;
import com.developerhub.ecommerce.backend.design.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping()
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = productService.save(product);
        return ResponseEntity.ok().body(savedProduct);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product getById = productService.getById(id);
        return ResponseEntity.ok().body(getById);

    }
}
