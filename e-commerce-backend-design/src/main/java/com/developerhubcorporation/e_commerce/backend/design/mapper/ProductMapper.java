package com.developerhubcorporation.e_commerce.backend.design.mapper;

import com.developerhubcorporation.e_commerce.backend.design.dto.ProductRequestDTO;
import com.developerhubcorporation.e_commerce.backend.design.dto.ProductResponseDTO;
import com.developerhubcorporation.e_commerce.backend.design.model.Product;
import org.mapstruct.Mapper;


// componentModel = "spring" tells MapStruct to generate this as a Spring Bean (@Component)
@Mapper(componentModel = "spring")
public interface ProductMapper {

    Product toEntity(ProductRequestDTO dto);

    ProductResponseDTO toResponseDTO(Product product);
}
