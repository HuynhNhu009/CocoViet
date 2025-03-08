package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.mapper.ICustomerMapper;
import com.cocoviet.backend.mapper.IProductMapper;
import com.cocoviet.backend.mapper.IRetailerMapper;
import com.cocoviet.backend.models.dto.*;
import com.cocoviet.backend.models.entity.CustomerEntity;
import com.cocoviet.backend.models.entity.ProductCategoryEntity;
import com.cocoviet.backend.models.entity.ProductEntity;
import com.cocoviet.backend.models.entity.ProductVariantEntity;
import com.cocoviet.backend.models.request.UserLoginRequest;
import com.cocoviet.backend.repository.ICustomerRepository;
import com.cocoviet.backend.repository.IProductCategoryRepository;
import com.cocoviet.backend.repository.IProductRepository;
import com.cocoviet.backend.repository.IRetailerRepository;
import com.cocoviet.backend.service.IAdminService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdminServiceImpl implements IAdminService {

    @Autowired
    ICustomerMapper iCustomerMapper;

    @Autowired
    ICustomerRepository icustomerRepository;

    @Autowired
    IProductRepository iProductRepository;

    @Autowired
    IProductCategoryRepository iProductCategoryRepository;

    @Autowired
    IProductMapper iProductMapper;

    @Autowired
    IRetailerMapper iRetailerMapper;

    @Autowired
    IRetailerRepository iRetailerRepository;

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return iCustomerMapper.toCustomerDTOList(icustomerRepository.findAll());

    }

    @Override
    public List<ProductDTO> getAllProducts() {
        List<ProductEntity> productEntities = iProductRepository.findAll();

        List<ProductDTO> productDTOS = productEntities.stream() //tra ve set<string>
                .map(productEntity -> {

                    //su dung lai getProductById
                    //Category
                    Set<ProductCategoryEntity> productCategoryEntities = iProductCategoryRepository.findByProduct(productEntity);
                    Set<String> categoryName = productCategoryEntities.stream() //tra ve set<string>
                            .map(productCategory -> productCategory.getCategory().getCategoryName())//get tu productCategory
                            .collect(Collectors.toSet());

                    //Unit
                    Set<ProductVariantEntity> productVariantEntity = productEntity.getVariants();
                    Set<ProductVariantDTO> productVariantDTOS = productVariantEntity.stream()
                            .map(variant -> ProductVariantDTO.builder()
                                    .variantId(variant.getVariantsId())
                                    .unitName(variant.getUnit().getUnitName())
                                    .price(variant.getPrice())
                                    .stock(888)
                                    .value(variant.getValue())
                                    .build())
                            .collect(Collectors.toSet());

                    ProductDTO productDTO = iProductMapper.toProductDTO(productEntity);
                    productDTO.setCategoryName(categoryName);
                    productDTO.setVariants(productVariantDTOS);

                    return productDTO;
                }).collect(Collectors.toList());

        return productDTOS;

    }


    @Override
    public List<RetailerDTO> getAllRetailers() {
        return iRetailerMapper.toListRetailerDTO(iRetailerRepository.findAll());
    }
}
