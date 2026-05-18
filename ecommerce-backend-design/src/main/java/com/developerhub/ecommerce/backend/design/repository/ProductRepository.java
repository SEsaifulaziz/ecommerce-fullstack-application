package com.developerhub.ecommerce.backend.design.repository;

import com.developerhub.ecommerce.backend.design.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>  {

}
