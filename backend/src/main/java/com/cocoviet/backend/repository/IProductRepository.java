package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<ProductEntity, String> {
    boolean existsByProductName(String email);

    @Query("SELECT p FROM ProductEntity p JOIN p.productCategories pc WHERE pc.category.id = :categoryId")
    List<ProductEntity> findProductsByCategoryId(@Param("categoryId") String categoryId);

    // Thêm phương thức mới để tìm sản phẩm theo retailerId
    @Query("SELECT p FROM ProductEntity p WHERE p.retailer.retailerId = :retailerId")
    List<ProductEntity> findProductsByRetailerId(@Param("retailerId") String retailerId);

    List<ProductEntity> findProductsEntitiesByDeleted(boolean deleted);
}