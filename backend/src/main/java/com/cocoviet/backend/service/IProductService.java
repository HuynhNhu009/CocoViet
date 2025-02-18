package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.request.ProductRequest;

import java.io.IOException;
import java.util.List;

public interface IProductService {
    ProductDTO addProduct(ProductRequest productRequest) throws IOException;
    ProductDTO updateProduct(String productId, ProductRequest productRequest) throws IOException;
    ProductDTO getProduct(String productId);
    List<ProductDTO> getAllProduct();
}
