package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.CustomerEntity;
import com.cocoviet.backend.models.entity.ProductEntity;
import com.cocoviet.backend.models.entity.ProductVariantEntity;
import com.cocoviet.backend.models.entity.RetailerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface IRetailerRepository extends JpaRepository<RetailerEntity, String> {
    boolean existsByRetailerEmail(String email);
    Optional<RetailerEntity> findByRetailerEmail(String email);
    RetailerEntity findByRetailerId(String retailerId);

    @Query("SELECT r.retailerName FROM RetailerEntity r JOIN r.products p WHERE p.productId = :productId")
    String findRetailerNameByProductId(@Param("productId") String productId);
}
