package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.request.ProductRequest;

public interface ICoconutProductService {
    ProductDTO addProduct(ProductRequest productRequest);
    ProductDTO updateProduct(String productId, ProductRequest productRequest);
    ProductDTO getProduct(String productId);
}
