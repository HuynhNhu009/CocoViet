package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.mapper.IProductMapper;
import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.entity.CoconutProductEntity;
import com.cocoviet.backend.models.request.ProductRequest;
import com.cocoviet.backend.repository.ICoconutProductRepository;
import com.cocoviet.backend.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements IProductService {

    @Autowired
    private ICoconutProductRepository coconutProductRepository; // Inject repository

    @Autowired
    private IProductMapper productMapper;

    @Override
    public ProductDTO addProduct(ProductRequest product) {
        CoconutProductEntity productEntity = CoconutProductEntity.builder()
                .productName(product.getProductName())
                .productDesc(product.getProductDesc())
                .productImage(product.getProductImage())
                .productOrigin(product.getProductOrigin())
                .build();

        return productMapper.toProductDTO(coconutProductRepository.save(productEntity));
    }
}
