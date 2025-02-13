package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.mapper.IProductMapper;
import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.entity.CoconutCategoryEntity;
import com.cocoviet.backend.models.entity.CoconutProductEntity;
import com.cocoviet.backend.models.entity.ProductCategoryEntity;
import com.cocoviet.backend.models.entity.RetailerEntity;
import com.cocoviet.backend.models.request.ProductRequest;
import com.cocoviet.backend.repository.ICategoryRepository;
import com.cocoviet.backend.repository.ICoconutProductRepository;
import com.cocoviet.backend.repository.IProductCategoryRepository;
import com.cocoviet.backend.repository.IRetailerRepository;
import com.cocoviet.backend.service.ICoconutCategoryService;
import com.cocoviet.backend.service.ICoconutProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class CoconutProductServiceImpl implements ICoconutProductService {

    private static final Logger logger = LoggerFactory.getLogger(CoconutProductServiceImpl.class);

    @Autowired
    private ICoconutProductRepository iCoconutProductRepository;

    @Autowired
//    @Qualifier("IProductMapperImpl")
    private IProductMapper iProductMapper;

//    anh
    @Autowired
    ICategoryRepository icategoryRepository;

    @Autowired
    IProductCategoryRepository iproductCategoryRepository;

    @Autowired
    IRetailerRepository iretailerRepository;

    @Override
    public ProductDTO addProduct(ProductRequest productRequest) {
        if (iCoconutProductRepository.existsByProductName(productRequest.getProductName())) {
            throw new RuntimeException("Product name already exists!");
        }

        RetailerEntity retailerEntity = iretailerRepository.findById(productRequest.getRetailerId())
                .orElseThrow(() -> new RuntimeException("Retailer not found!"));

        CoconutProductEntity productEntity = CoconutProductEntity.builder()
                .productName(productRequest.getProductName())
                .productDesc(productRequest.getProductDesc())
                .productImage(productRequest.getProductImage())
                .productOrigin(productRequest.getProductOrigin())
                //anh
                .retailer(retailerEntity)
                .createdAt(LocalDateTime.now())
                .build();

        //save productEntity
        productEntity = iCoconutProductRepository.save(productEntity);

        Set<ProductCategoryEntity> newProductCategoryEntities = new HashSet<>();
        Set<String> categoryName = new HashSet<>();

        for(String categoryId : productRequest.getCategoryId()) {
            CoconutCategoryEntity categoryEntity = icategoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            ProductCategoryEntity productCategoryEntity = new ProductCategoryEntity();
            productCategoryEntity.setProduct(productEntity);
            productCategoryEntity.setCategory(categoryEntity);

            newProductCategoryEntities.add(productCategoryEntity);
            categoryName.add(categoryEntity.getCategoryName());
        }
        iproductCategoryRepository.saveAll(newProductCategoryEntities);

        //update productEntity
        productEntity.setProductCategories(newProductCategoryEntities);
        iCoconutProductRepository.save(productEntity);

        ProductDTO productDTO = ProductDTO.builder()
                .productId(productEntity.getProductId())
                .productName(productEntity.getProductName())
                .productDesc(productEntity.getProductDesc())
                .productImage(productEntity.getProductImage())
                .productOrigin(productEntity.getProductOrigin())
                .categoryName(categoryName)
                .createdAt(productEntity.getCreatedAt())
                .retailerName(retailerEntity.getRetailerName())
                .build();
        return productDTO;
    }

    @Override
    public ProductDTO updateProduct(String productId, ProductRequest productRequest) {
        CoconutProductEntity coconutProductEntity = iCoconutProductRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        coconutProductEntity.setProductName(productRequest.getProductName());
        coconutProductEntity.setProductDesc(productRequest.getProductDesc());
        coconutProductEntity.setProductImage(productRequest.getProductImage());
        coconutProductEntity.setProductOrigin(productRequest.getProductOrigin());

        return iProductMapper.toProductDTO(iCoconutProductRepository.save(coconutProductEntity));
    }

    @Override
    public ProductDTO getProduct(String productId) {

        CoconutProductEntity productEntity = iCoconutProductRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        ProductCategoryEntity productCategoryEntity =
        return iProductMapper.toProductDTO(
                .orElseThrow(() -> new RuntimeException("Product not found"))));
    }

    @Override
    public List<ProductDTO> getAllProduct() {
        return iProductMapper.toProductDTOList(iCoconutProductRepository.findAll());

    }
}
