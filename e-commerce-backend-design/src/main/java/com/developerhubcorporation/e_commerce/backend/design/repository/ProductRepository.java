package com.developerhubcorporation.e_commerce.backend.design.repository;

import com.developerhubcorporation.e_commerce.backend.design.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {

}
