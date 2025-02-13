package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductRepository extends JpaRepository<ProductEntity, String> {
    boolean existsByProductName(String email);
}
