package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.CoconutCategoryDTO;
import com.cocoviet.backend.models.request.*;

import java.util.List;

public interface ICoconutCategoryService {
    CoconutCategoryDTO addCategory(CategoryRequest categoryRequest);
    CoconutCategoryDTO updateCategory(String categoryId, CategoryRequest categoryRequest);
    CoconutCategoryDTO getCategoryById(String categoryId);
    List<CoconutCategoryDTO> getAllCategories();
}
