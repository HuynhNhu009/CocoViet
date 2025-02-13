package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.CategoryDTO;
import com.cocoviet.backend.models.entity.CategoryEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ICategoryMapper {
    CategoryDTO toCategoryDTO(CategoryEntity categoryEntity);
    List<CategoryDTO> toListCategoryDTO(List<CategoryEntity> categoryEntity);
}

