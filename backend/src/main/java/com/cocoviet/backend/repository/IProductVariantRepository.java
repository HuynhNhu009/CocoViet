package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.ProductEntity;
import com.cocoviet.backend.models.entity.ProductVariantEntity;
import com.cocoviet.backend.models.entity.UnitEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IProductVariantRepository extends JpaRepository<ProductVariantEntity, String> {
    Set<ProductVariantEntity> findProductVariantEntityByProduct(ProductEntity product);
    ProductVariantEntity findByVariantsId(String variantsId);
//    boolean existsByVariantsId(String variantsId);
// Sửa tên method để tuân theo quy ước
    boolean existsByUnit(UnitEntity unitEntity);
}
