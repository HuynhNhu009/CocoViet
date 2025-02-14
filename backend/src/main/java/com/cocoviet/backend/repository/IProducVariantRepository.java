package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.ProductCategoryEntity;
import com.cocoviet.backend.models.entity.ProductEntity;
import com.cocoviet.backend.models.entity.ProductVariantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IProducVariantRepository extends JpaRepository<ProductVariantEntity, String> {
    Set<ProductVariantEntity> findProductVariantEntityByProduct(ProductEntity product);

}
