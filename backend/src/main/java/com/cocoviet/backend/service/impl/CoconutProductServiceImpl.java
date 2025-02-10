package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.mapper.IProductMapper;
import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.entity.CoconutProductEntity;
import com.cocoviet.backend.models.request.ProductRequest;
import com.cocoviet.backend.repository.ICoconutProductRepository;
import com.cocoviet.backend.service.ICoconutProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CoconutProductServiceImpl implements ICoconutProductService {

    @Autowired
    private ICoconutProductRepository coconutProductRepository; // Inject repository

    @Autowired
    private IProductMapper productMapper;

    @Override
    public ProductDTO addProduct(ProductRequest product) {
        if(coconutProductRepository.existsByProductName(product.getProductName())) {
            throw new RuntimeException("Product name already exists");
        }
        CoconutProductEntity productEntity = CoconutProductEntity.builder()
                .productName(product.getProductName())
                .productDesc(product.getProductDesc())
                .productImage(product.getProductImage())
                .productOrigin(product.getProductOrigin())
                .build();

        return productMapper.toProductDTO(coconutProductRepository.save(productEntity));
    }
}
