package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.CoconutCategoryEntity;
import com.cocoviet.backend.models.entity.CoconutProductEntity;
import com.cocoviet.backend.models.entity.ProductCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategoryRepository extends JpaRepository<CoconutCategoryEntity, String> {
    boolean existsByCategoryName(String categoryName);
}
