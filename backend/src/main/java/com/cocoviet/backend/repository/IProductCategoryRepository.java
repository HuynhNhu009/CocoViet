package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.ProductEntity;
import com.cocoviet.backend.models.entity.ProductCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IProductCategoryRepository extends JpaRepository<ProductCategoryEntity, String> {
    Set<ProductCategoryEntity> findByProduct(ProductEntity product);
}
