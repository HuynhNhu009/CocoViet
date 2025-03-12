package com.cocoviet.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cocoviet.backend.models.entity.PostEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IPostRepository extends JpaRepository<PostEntity, String> {
    @Query("SELECT p FROM PostEntity p WHERE p.retailer.retailerId = :retailerId")
    List<PostEntity> findByRetailerId(@Param("retailerId") String retailerId);
}
