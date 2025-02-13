package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.entity.CoconutProductEntity;
import com.cocoviet.backend.models.request.ProductRequest;

import java.util.List;

public interface ICoconutProductService {
    ProductDTO addProduct(ProductRequest productRequest);
    ProductDTO updateProduct(String productId, ProductRequest productRequest);
    ProductDTO getProduct(String productId);
    List<ProductDTO> getAllProduct();
}
