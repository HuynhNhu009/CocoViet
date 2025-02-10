package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.entity.CoconutProductEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IProductMapper {
    ProductDTO toProductDTO(CoconutProductEntity productEntity);
}
