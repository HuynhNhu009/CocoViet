package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.CoconutProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ICoconutProductRepository extends JpaRepository<CoconutProductEntity, String> {
    boolean existsByProductName(String email);
//   Optional<CoconutProductEntity> findById(String productId);
}
