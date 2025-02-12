package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.mapper.ICoconutCategoryMapper;
import com.cocoviet.backend.models.dto.CoconutCategoryDTO;
import com.cocoviet.backend.models.entity.CoconutCategoryEntity;
import com.cocoviet.backend.models.request.CategoryRequest;
import com.cocoviet.backend.repository.ICategoryRepository;
import com.cocoviet.backend.service.ICoconutCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoconutCategoryServiceImpl implements ICoconutCategoryService {

    @Autowired
    private ICategoryRepository iCategoryRepository;

    @Autowired
    private ICoconutCategoryMapper iCoconutCategoryMapper;

    @Override
    public CoconutCategoryDTO addCategory(CategoryRequest categoryRequest) {
        if (iCategoryRepository.existsByCategoryName(categoryRequest.getCategoryName())) {
            throw new RuntimeException("Category name already exists");
        }

        CoconutCategoryEntity categoryEntity = CoconutCategoryEntity.builder()
                .categoryName(categoryRequest.getCategoryName())
                .build();

        return iCoconutCategoryMapper.toCategoryDTO(iCategoryRepository.save(categoryEntity));
    }

    @Override
    public CoconutCategoryDTO updateCategory(String categoryId, CategoryRequest categoryRequest) {
        CoconutCategoryEntity categoryEntity = iCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (iCategoryRepository.existsByCategoryName(categoryRequest.getCategoryName())) {
            throw new RuntimeException("Category name already exists");
        }

        categoryEntity.setCategoryName(categoryRequest.getCategoryName());
        return iCoconutCategoryMapper.toCategoryDTO(iCategoryRepository.save(categoryEntity));
    }

    @Override
    public CoconutCategoryDTO getCategoryById(String categoryId) {
        CoconutCategoryEntity categoryEntity = iCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return iCoconutCategoryMapper.toCategoryDTO(categoryEntity);
    }

    @Override
    public List<CoconutCategoryDTO> getAllCategories() {
        return iCoconutCategoryMapper.toListCategoryDTO(iCategoryRepository.findAll());
    }
}
