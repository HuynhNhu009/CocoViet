package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.CategoryDTO;
import com.cocoviet.backend.models.request.*;

import java.util.List;

public interface ICategoryService {
    CategoryDTO addCategory(CategoryRequest categoryRequest);
    CategoryDTO updateCategory(String categoryId, CategoryRequest categoryRequest);
    CategoryDTO getCategoryById(String categoryId);
    List<CategoryDTO> getAllCategories();
    void deleteCategory(String categoryId);

}
