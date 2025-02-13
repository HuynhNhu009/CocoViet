package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.mapper.ICategoryMapper;
import com.cocoviet.backend.models.dto.CategoryDTO;
import com.cocoviet.backend.models.entity.CategoryEntity;
import com.cocoviet.backend.models.request.CategoryRequest;
import com.cocoviet.backend.repository.ICategoryRepository;
import com.cocoviet.backend.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements ICategoryService {

    @Autowired
    private ICategoryRepository iCategoryRepository;

    @Autowired
    private ICategoryMapper iCategoryMapper;

    @Override
    public CategoryDTO addCategory(CategoryRequest categoryRequest) {
        if (iCategoryRepository.existsByCategoryName(categoryRequest.getCategoryName())) {
            throw new RuntimeException("Category name already exists");
        }

        CategoryEntity categoryEntity = CategoryEntity.builder()
                .categoryName(categoryRequest.getCategoryName())
                .build();

        return iCategoryMapper.toCategoryDTO(iCategoryRepository.save(categoryEntity));
    }

    @Override
    public CategoryDTO updateCategory(String categoryId, CategoryRequest categoryRequest) {
        CategoryEntity categoryEntity = iCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (iCategoryRepository.existsByCategoryName(categoryRequest.getCategoryName())) {
            throw new RuntimeException("Category name already exists");
        }

        categoryEntity.setCategoryName(categoryRequest.getCategoryName());
        return iCategoryMapper.toCategoryDTO(iCategoryRepository.save(categoryEntity));
    }

    @Override
    public CategoryDTO getCategoryById(String categoryId) {
        CategoryEntity categoryEntity = iCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return iCategoryMapper.toCategoryDTO(categoryEntity);
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        return iCategoryMapper.toListCategoryDTO(iCategoryRepository.findAll());
    }
}
