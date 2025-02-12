package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.CoconutCategoryDTO;
import com.cocoviet.backend.models.entity.CoconutCategoryEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ICoconutCategoryMapper {
    CoconutCategoryDTO toCategoryDTO(CoconutCategoryEntity categoryEntity);
    List<CoconutCategoryDTO> toListCategoryDTO(List<CoconutCategoryEntity> categoryEntity);
}

