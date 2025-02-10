package com.cocoviet.backend.service;

import com.cocoviet.backend.models.reponse.ProductResponse;
import com.cocoviet.backend.models.request.ProductRequest;

public interface IProductService {
    ProductResponse addProduct(ProductRequest product);


}
