package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.request.ProductRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IProductService {
    ProductDTO addProduct(ProductRequest productRequest, MultipartFile imageFile) throws IOException;
    ProductDTO updateProduct(String productId,ProductRequest productRequest, MultipartFile imageFile) throws IOException;
    ProductDTO getProduct(String productId);
    List<ProductDTO> getAllProduct();
    List<ProductDTO> getProductByCategory(String categoryId);
    List<ProductDTO> getProductListByRetailerId(String retailerId);
}
