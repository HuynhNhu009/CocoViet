package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.mapper.IProductMapper;
import com.cocoviet.backend.mapper.ProductVariantMapper;
import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.dto.ProductVariantDTO;
import com.cocoviet.backend.models.entity.*;
import com.cocoviet.backend.models.request.ProductRequest;
import com.cocoviet.backend.models.request.ProductVariantsRequest;
import com.cocoviet.backend.repository.*;
import com.cocoviet.backend.service.IProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ProductServiceImpl implements IProductService {

    @Autowired
    private IProductRepository iProductRepository;

    @Autowired
    private IProductMapper iProductMapper;

    @Autowired
    ICategoryRepository icategoryRepository;

    @Autowired
    IUnitRepository iUnitRepository;

    @Autowired
    IProducVariantRepository iProducVariantRepository;

    @Autowired
    IProductCategoryRepository iproductCategoryRepository;

    @Autowired
    IRetailerRepository iretailerRepository;

    @Autowired
    ProductVariantMapper productVariantMapper;

//    @Autowired
//    IFileUpload iFileUpload;

    @Override
    public ProductDTO addProduct(ProductRequest productRequest){
        if (iProductRepository.existsByProductName(productRequest.getProductName())) {
            throw new RuntimeException("Product name already exists!");
        }

        RetailerEntity retailerEntity = iretailerRepository.findById(productRequest.getRetailerId())
                .orElseThrow(() -> new RuntimeException("Retailer not found!"));

        ProductEntity productEntity = ProductEntity.builder()
                .productName(productRequest.getProductName())
                .productDesc(productRequest.getProductDesc())
                .productImage(productRequest.getProductImage())
                .productOrigin(productRequest.getProductOrigin())
                .retailer(retailerEntity)
                .createdAt(LocalDateTime.now())
                .build();

        //save productEntity
        productEntity = iProductRepository.save(productEntity);

        //-----Relationship with CATEGORY-----
        Set<ProductCategoryEntity> newProductCategoryEntities = new HashSet<>();
        Set<String> categoryName = new HashSet<>();

        for(String categoryId : productRequest.getCategoryId()) {
            CategoryEntity categoryEntity = icategoryRepository.findById(categoryId)
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
        //-----END Relationship with CATEGORY----

        //-----Relationship with UNIT-----
        Set<ProductVariantEntity> newProductVariantEntities = new HashSet<>();

        for(ProductVariantsRequest getProductVariants : productRequest.getProductVariants()) {
            UnitEntity unitEntity = iUnitRepository.findById(getProductVariants.getUnitId())
                    .orElseThrow(() -> new RuntimeException("Unit not found"));

            ProductVariantEntity productVariantEntity = ProductVariantEntity.builder()
                    .product(productEntity)
                    .unit(unitEntity)
                    .price(getProductVariants.getPrice())
                    .initStock(getProductVariants.getInitStock())
                    .stock(getProductVariants.getInitStock())
                    .value(getProductVariants.getValue())
                    .build();

            newProductVariantEntities.add(productVariantEntity);
        }
        iProducVariantRepository.saveAll(newProductVariantEntities);

        //update productEntity
        productEntity.setVariants(newProductVariantEntities);

        //map productVariantEntity to productVariantDTO
        Set<ProductVariantDTO> productVariantDTOS = productVariantMapper.toDTOSet(productEntity.getVariants());
        //-----END Relationship with UNIT----

        //final update product
        iProductRepository.save(productEntity);

        //map productEntity to productDTO
        ProductDTO  productDTO = iProductMapper.toProductDTO(productEntity);
        productDTO.setCategoryName(categoryName);
        productDTO.setVariants(productVariantDTOS);

        return productDTO;
    }

    @Override
    public ProductDTO updateProduct(String productId, ProductRequest productRequest)  {

        ProductEntity productEntity = iProductRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found!"));

        //update productEntity
        productEntity.setProductName(productRequest.getProductName());
        productEntity.setProductDesc(productRequest.getProductDesc());
        productEntity.setProductImage(productRequest.getProductImage());
        productEntity.setProductOrigin(productRequest.getProductOrigin());
        productEntity.setCreatedAt(LocalDateTime.now());
        productEntity = iProductRepository.save(productEntity);

        //get all existingProductCategories and existingProductVariant of product
        Set<ProductCategoryEntity> existingProductCategories = iproductCategoryRepository.findByProduct(productEntity);
        Set<ProductVariantEntity> exsistProductVariants = iProducVariantRepository.findProductVariantEntityByProduct(productEntity);

        //update newCategory
        Set<ProductCategoryEntity> newProductCategoryEntities = new HashSet<>();
        Set<String> categoryName = new HashSet<>();

        //update newVariants
        Set<ProductVariantEntity> newProductVariantEntities = new HashSet<>();
        Set<ProductVariantDTO> productVariantDTOS = new HashSet<>();

        if(productRequest.getCategoryId() != null && productRequest.getProductVariants() != null){
            //relationship with CATEGORY
            //deleted old cate
            iproductCategoryRepository.deleteAll(existingProductCategories);

            for(String categoryId : productRequest.getCategoryId()) {
                CategoryEntity categoryEntity = icategoryRepository.findById(categoryId)
                        .orElseThrow(() -> new RuntimeException("Category not found"));
                ProductCategoryEntity productCategoryEntity = new ProductCategoryEntity();
                productCategoryEntity.setProduct(productEntity);
                productCategoryEntity.setCategory(categoryEntity);

                newProductCategoryEntities.add(productCategoryEntity);
                categoryName.add(categoryEntity.getCategoryName());
            }
            //save productCategory
            iproductCategoryRepository.saveAll(newProductCategoryEntities);

            //update productEntity
            productEntity.setProductCategories(newProductCategoryEntities);
            iProductRepository.save(productEntity);
        }else{
            //No change category and unit
            Set<ProductCategoryEntity> productCategoryEntities = iproductCategoryRepository.findByProduct(productEntity);
            categoryName = productCategoryEntities.stream() //tra ve set<string>
                    .map(productCategory -> productCategory.getCategory().getCategoryName())//get tu productCategory
                    .collect(Collectors.toSet());

        }
        //UNIT
        if(productRequest.getProductVariants() != null){
            //Relationship with Unit
            iProducVariantRepository.deleteAll(exsistProductVariants);

            for(ProductVariantsRequest getProductVariants : productRequest.getProductVariants()) {
                UnitEntity unitEntity = iUnitRepository.findById(getProductVariants.getUnitId())
                        .orElseThrow(() -> new RuntimeException("Unit not found"));

                ProductVariantEntity productVariantEntity = ProductVariantEntity.builder()
                        .product(productEntity)
                        .unit(unitEntity)
                        .price(getProductVariants.getPrice())
                        .initStock(getProductVariants.getInitStock())
                        .stock(getProductVariants.getInitStock())
                        .value(getProductVariants.getValue())
                        .build();

                newProductVariantEntities.add(productVariantEntity);
            }
            iProducVariantRepository.saveAll(newProductVariantEntities);

            productVariantDTOS= productVariantMapper.toDTOSet(newProductVariantEntities);
            //update productEntity
            productEntity.setVariants(newProductVariantEntities);

            iProductRepository.save(productEntity);

        }else{
            productVariantDTOS = productVariantMapper.toDTOSet(productEntity.getVariants());
        }

        ProductDTO  productDTO = iProductMapper.toProductDTO(productEntity);
        productDTO.setCategoryName(categoryName);
        productDTO.setVariants(productVariantDTOS);

        return productDTO;
    }

    @Override
    public ProductDTO getProduct(String productId) {

        ProductEntity productEntity = iProductRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        //relationship category
        Set<ProductCategoryEntity> productCategoryEntities = iproductCategoryRepository.findByProduct(productEntity);
        Set<String> categoryName = productCategoryEntities.stream() //tra ve set<string>
                .map(productCategory -> productCategory.getCategory().getCategoryName())//get tu productCategory
                .collect(Collectors.toSet());

        //map productVariantEntity to productVariantDTO
        Set<ProductVariantDTO> productVariantDTOS = productVariantMapper.toDTOSet(productEntity.getVariants());

        ProductDTO productDTO = iProductMapper.toProductDTO(productEntity);
        productDTO.setCategoryName(categoryName);
        productDTO.setVariants(productVariantDTOS);

        return productDTO;
    }

    @Override
    public List<ProductDTO> getAllProduct() {
        List<ProductEntity> productEntities = iProductRepository.findAll();

        List<ProductDTO> productDTOS = productEntities.stream() //tra ve set<string>
                .map(productEntity -> {

                    //su dung lai getProductById
                    //Category
                    Set<ProductCategoryEntity> productCategoryEntities = iproductCategoryRepository.findByProduct(productEntity);
                    Set<String> categoryName = productCategoryEntities.stream() //tra ve set<string>
                            .map(productCategory -> productCategory.getCategory().getCategoryName())//get tu productCategory
                            .collect(Collectors.toSet());

                    //Unit
                    Set<ProductVariantDTO> productVariantDTOS = productVariantMapper.toDTOSet(productEntity.getVariants());

                    ProductDTO productDTO = iProductMapper.toProductDTO(productEntity);
                    productDTO.setCategoryName(categoryName);
                    productDTO.setVariants(productVariantDTOS);

                    return productDTO;
                }).collect(Collectors.toList());

        return productDTOS;

    }

    @Override
    public List<ProductDTO> getProductByCategory(String categoryId) {

        List<ProductEntity> productEntities = iProductRepository.findProductsByCategoryId(categoryId);
        if(productEntities.size() == 0){
            return null;
        }
        List<ProductDTO> productDTOS = productEntities.stream() //tra ve set<string>
                .map(productEntity -> {
                    //su dung lai getProductById
                    //Category
                    Set<ProductCategoryEntity> productCategoryEntities = iproductCategoryRepository.findByProduct(productEntity);
                    Set<String> categoryName = productCategoryEntities.stream() //tra ve set<string>
                            .map(productCategory -> productCategory.getCategory().getCategoryName())//get tu productCategory
                            .collect(Collectors.toSet());

                    //Unit
                    Set<ProductVariantDTO> productVariantDTOS = productVariantMapper.toDTOSet(productEntity.getVariants());

                    ProductDTO productDTO = iProductMapper.toProductDTO(productEntity);
                    productDTO.setCategoryName(categoryName);
                    productDTO.setVariants(productVariantDTOS);

                    return productDTO;
                }).collect(Collectors.toList());

        return productDTOS;
    }
}
