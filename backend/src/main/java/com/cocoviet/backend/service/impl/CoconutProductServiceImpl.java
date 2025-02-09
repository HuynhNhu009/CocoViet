package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.mapper.IProductMapper;
import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.entity.CoconutProductEntity;
import com.cocoviet.backend.models.request.ProductRequest;
import com.cocoviet.backend.repository.ICoconutProductRepository;
import com.cocoviet.backend.service.ICoconutProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class CoconutProductServiceImpl implements ICoconutProductService {

    private static final Logger logger = LoggerFactory.getLogger(CoconutProductServiceImpl.class);

    @Autowired
    private ICoconutProductRepository coconutProductRepository;

    @Autowired
    private IProductMapper iProductMapper;

    @Override
    public ProductDTO addProduct(ProductRequest product) {
        // Kiểm tra null
//        if (product == null || product.getProductName() == null || product.getProductName().trim().isEmpty()) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product name cannot be empty");
//        }

        // Kiểm tra nếu sản phẩm đã tồn tại
        if (coconutProductRepository.existsByProductName(product.getProductName())) {
            logger.warn("Product with name {} already exists", product.getProductName());
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Product name already exists");
        }

        // Tạo entity từ request
        CoconutProductEntity productEntity = CoconutProductEntity.builder()
                .productName(product.getProductName())
                .productDesc(product.getProductDesc() )
                .productImage(product.getProductImage() )
                .productOrigin(product.getProductOrigin())
                .build();

        // Lưu vào database
        CoconutProductEntity savedProduct = coconutProductRepository.save(productEntity);

        // Trả về ProductDTO
        return iProductMapper.toProductDTO(savedProduct);
    }
}
