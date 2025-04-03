package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.Enum.ProductStatus;
import com.cocoviet.backend.mapper.IProductMapper;
import com.cocoviet.backend.mapper.ProductVariantMapper;
import com.cocoviet.backend.models.dto.PostDTO;
import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.dto.ProductVariantDTO;
import com.cocoviet.backend.models.entity.*;
import com.cocoviet.backend.models.request.ProductRequest;
import com.cocoviet.backend.models.request.ProductVariantsRequest;
import com.cocoviet.backend.repository.*;
import com.cocoviet.backend.service.IFileUpload;
import com.cocoviet.backend.service.IProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
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
    IProductVariantRepository iProductVariantRepository;

    @Autowired
    IProductCategoryRepository iproductCategoryRepository;

    @Autowired
    IRetailerRepository iretailerRepository;

    @Autowired
    IPostRepository iPostRepository;

    @Autowired
    ProductVariantMapper productVariantMapper;

    @Autowired
    IFileUpload iFileUpload;

    @Override
    public ProductDTO addProduct(ProductRequest productRequest, MultipartFile imageFile) throws IOException {

    RetailerEntity retailerEntity = iretailerRepository.findById(productRequest.getRetailerId())
            .orElseThrow(() -> new RuntimeException("Retailer not found"));

    ProductEntity productEntity = ProductEntity.builder()
            .productName(productRequest.getProductName())
            .productDesc(productRequest.getProductDesc())
            .productImage(iFileUpload.uploadFile(imageFile, "product"))
            .productOrigin(productRequest.getProductOrigin())
            .retailer(retailerEntity)
            .status(ProductStatus.DISABLE.name())
            .createdAt(LocalDateTime.now())
            .build();

    // Save productEntity
    productEntity = iProductRepository.save(productEntity);

    // -----Relationship with CATEGORY-----
    Set<ProductCategoryEntity> newProductCategoryEntities = new HashSet<>();
    Set<String> categoryName = new HashSet<>();

    for (String categoryId : productRequest.getCategoryId()) {
        CategoryEntity categoryEntity = icategoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        ProductCategoryEntity productCategoryEntity = new ProductCategoryEntity();
        productCategoryEntity.setProduct(productEntity);
        productCategoryEntity.setCategory(categoryEntity);

        newProductCategoryEntities.add(productCategoryEntity);
        categoryName.add(categoryEntity.getCategoryName());
    }
    iproductCategoryRepository.saveAll(newProductCategoryEntities);
    productEntity.setProductCategories(newProductCategoryEntities);

    // -----Relationship with UNIT-----
    Set<ProductVariantEntity> newProductVariantEntities = new HashSet<>();

    // Kiểm tra productVariants trước khi duyệt
    if (productRequest.getProductVariants() == null || productRequest.getProductVariants().isEmpty()) {
        throw new IllegalArgumentException("Product variants cannot be null or empty");
    }

    for (ProductVariantsRequest variantRequest : productRequest.getProductVariants()) {
        UnitEntity unitEntity = iUnitRepository.findById(variantRequest.getUnitId())
                .orElseThrow(() -> new RuntimeException("Unit not found"));

        ProductVariantEntity productVariantEntity = ProductVariantEntity.builder()
                .product(productEntity)
                .unit(unitEntity)
                .price(variantRequest.getPrice())
                .initStock(variantRequest.getInitStock())
                .stock(variantRequest.getInitStock())
                .value(variantRequest.getValue())
                .build();

        newProductVariantEntities.add(productVariantEntity);
    }
    iProductVariantRepository.saveAll(newProductVariantEntities);
    productEntity.setVariants(newProductVariantEntities);

    // Map productVariantEntity to productVariantDTO
    Set<ProductVariantDTO> productVariantDTOS = productVariantMapper.toDTOSet(productEntity.getVariants());

    // Final update product
    iProductRepository.save(productEntity);

    // Map productEntity to productDTO
    ProductDTO productDTO = iProductMapper.toProductDTO(productEntity);
    productDTO.setCategoryName(categoryName);
    productDTO.setVariants(productVariantDTOS);

    return productDTO;
}

    @Override
    public ProductDTO updateProduct(String productId, ProductRequest productRequest, MultipartFile imageFile) throws IOException {

        ProductEntity productEntity = iProductRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found!"));
        if(imageFile != null && !imageFile.isEmpty()){
            productEntity.setProductImage(iFileUpload.uploadFile(imageFile, "product"));
        }
        //update productEntity
        if(productRequest.getProductName() != null) {
            productEntity.setProductName(productRequest.getProductName());
        }

        if(productRequest.getProductDesc() != null) {
            productEntity.setProductDesc(productRequest.getProductDesc());
        }
        if(productRequest.getProductOrigin() != null) {
            productEntity.setProductOrigin(productRequest.getProductOrigin());
        }

        if(productRequest.getStatus() != null) {
            productEntity.setStatus(productRequest.getStatus());
        }
        productEntity = iProductRepository.save(productEntity);


        //get all existingProductCategories and existingProductVariant of product
        Set<ProductCategoryEntity> existingProductCategories = iproductCategoryRepository.findByProduct(productEntity);
        Set<ProductVariantEntity> exsistProductVariants = iProductVariantRepository.findProductVariantEntityByProduct(productEntity);

        //update newCategory
        Set<ProductCategoryEntity> newProductCategoryEntities = new HashSet<>();
        Set<String> categoryName = new HashSet<>();

        //update newVariants
        Set<ProductVariantEntity> newProductVariantEntities = new HashSet<>();
        Set<ProductVariantDTO> productVariantDTOS = new HashSet<>();

        if(productRequest.getCategoryId() != null ){
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
        // UNIT
        if (productRequest.getProductVariants() != null) {
            //getVariants
            Map<String, ProductVariantEntity> existingVariantsMap = exsistProductVariants.stream()
                    .collect(Collectors.toMap(ProductVariantEntity::getVariantsId, variant -> variant));

            for (ProductVariantsRequest getProductVariants : productRequest.getProductVariants()) {
                ProductVariantEntity productVariantEntity;

                if (getProductVariants.getVariantId() != null && existingVariantsMap.containsKey(getProductVariants.getVariantId())) {
                    productVariantEntity = existingVariantsMap.get(getProductVariants.getVariantId());
                    productVariantEntity.setPrice(getProductVariants.getPrice());
                    productVariantEntity.setInitStock(getProductVariants.getInitStock());
                    productVariantEntity.setStock(getProductVariants.getInitStock());
                    productVariantEntity.setValue(getProductVariants.getValue());
                } else {
                    UnitEntity unitEntity = iUnitRepository.findById(getProductVariants.getUnitId())
                            .orElseThrow(() -> new RuntimeException("Unit not found"));

                    productVariantEntity = ProductVariantEntity.builder()
                            .product(productEntity)
                            .unit(unitEntity)
                            .price(getProductVariants.getPrice())
                            .initStock(getProductVariants.getInitStock())
                            .stock(getProductVariants.getInitStock())
                            .value(getProductVariants.getValue())
                            .build();
                }
                newProductVariantEntities.add(productVariantEntity);
            }

            iProductVariantRepository.saveAll(newProductVariantEntities);

            productEntity.setVariants(newProductVariantEntities);
            iProductRepository.save(productEntity);

            productVariantDTOS = productVariantMapper.toDTOSet(productEntity.getVariants());

        } else {
            productVariantDTOS = productVariantMapper.toDTOSet(productEntity.getVariants());
        }
//        productEntity.setDeleted(false);
//        iProductRepository.save(productEntity);

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
    public ProductDTO deleteVariants(String productId, String variantId) {
        ProductEntity productEntity = iProductRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        ProductVariantEntity productVariantEntity = iProductVariantRepository.findById(variantId).orElseThrow(() -> new RuntimeException("Variant not found"));

        iProductVariantRepository.deleteById(productVariantEntity.getVariantsId());
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
    public List<ProductDTO> getAllProductEnable() {
        List<ProductEntity> productEntities = iProductRepository.findProductsEntitiesByStatus(ProductStatus.ENABLE.name());

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

    @Override
    public List<ProductDTO> getProductListByRetailerId(String retailerId) {
        List<ProductEntity> productEntities = iProductRepository.findProductsByRetailerId(retailerId);

        if (productEntities.size() == 0) {
            return null;
        }

        List<ProductDTO> productDTOS = productEntities.stream()
                .map(productEntity -> {
                    // 3.1. Lấy danh sách ProductCategoryEntity liên quan đến productEntity
                    Set<ProductCategoryEntity> productCategoryEntities = iproductCategoryRepository.findByProduct(productEntity);
                    // 3.2. Trích xuất tên các danh mục (categoryName)
                    Set<String> categoryId = productCategoryEntities.stream()
                            .map(productCategory -> productCategory.getCategory().getCategoryId())
                            .collect(Collectors.toSet());

                    // 3.3. Chuyển đổi các ProductVariantEntity thành ProductVariantDTO
                    Set<ProductVariantDTO> productVariantDTOS = productVariantMapper.toDTOSet(productEntity.getVariants());

                    // 3.4. Chuyển đổi ProductEntity thành ProductDTO và gán thêm thông tin
                    ProductDTO productDTO = iProductMapper.toProductDTO(productEntity);
                    productDTO.setCategoryName(categoryId);
                    productDTO.setVariants(productVariantDTOS);

                    return productDTO;
                })
                .collect(Collectors.toList());

        // 4. Trả về danh sách ProductDTO
        return productDTOS;
    }

    @Override
    public List<ProductDTO> getProductListByPostId(String postId) {
        PostEntity post = iPostRepository.findById(postId)
                .orElseThrow(()-> new RuntimeException("Post not found."));

        Set<String> productIds = post.getProductIds();

        if (productIds == null || productIds.isEmpty()) {
            throw new RuntimeException("Product of post not found.");
        }

        List<ProductEntity> productEntities = iProductRepository.findAllById(productIds);

        return iProductMapper.toProductDTOList(productEntities);
    }

    @Override
    public List<ProductDTO> deleteProductById(String productId) {
        ProductEntity productEntity = iProductRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        if(productEntity == null) throw new RuntimeException("Product not found");
        iProductRepository.deleteById(productId);

        List<ProductEntity> productEntityFetch = iProductRepository.findAll();
        return iProductMapper.toProductDTOList(productEntityFetch);
    }

    @Override
    public ProductDTO setStatusProduct(String productId, String statusName) {
        // Find the product entity or throw exception if not found
        ProductEntity productEntity = iProductRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Validate statusName against ProductStatus enum
        try {
            ProductStatus.valueOf(statusName.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status name: " + statusName);
        }

        // Set the status and save
        productEntity.setStatus(statusName);
        productEntity = iProductRepository.save(productEntity);

        // Convert to DTO with category and variant information (consistent with other methods)
        Set<ProductCategoryEntity> productCategoryEntities = iproductCategoryRepository.findByProduct(productEntity);
        Set<String> categoryNames = productCategoryEntities.stream()
                .map(productCategory -> productCategory.getCategory().getCategoryName())
                .collect(Collectors.toSet());

        Set<ProductVariantDTO> productVariantDTOS = productVariantMapper.toDTOSet(productEntity.getVariants());

        ProductDTO productDTO = iProductMapper.toProductDTO(productEntity);
        productDTO.setCategoryName(categoryNames);
        productDTO.setVariants(productVariantDTOS);

        return productDTO;
    }
}
