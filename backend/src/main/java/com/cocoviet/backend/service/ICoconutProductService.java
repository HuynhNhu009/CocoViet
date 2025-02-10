package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.request.ProductRequest;

public interface ICoconutProductService {
    ProductDTO addProduct(ProductRequest product);


}
