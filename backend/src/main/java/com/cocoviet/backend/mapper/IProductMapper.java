package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.entity.CoconutProductEntity;
import com.cocoviet.backend.models.request.ProductRequest;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IProductMapper {
    ProductDTO toProductDTO(CoconutProductEntity productEntity);
    List<ProductDTO> toProductDTOList(List<CoconutProductEntity> productEntity);
//    CoconutProductEntity toEntity(ProductRequest productRequest);
}

