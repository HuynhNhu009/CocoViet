package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Set;

@Repository
public interface ICategoryRepository extends JpaRepository<CategoryEntity, String> {
    boolean existsByCategoryName(String categoryName);
    Set<CategoryEntity> findByCategoryIdIn(Collection<String> categoryIds);

    CategoryEntity findCategoryEntityByCategoryId(String categoryId);
}
