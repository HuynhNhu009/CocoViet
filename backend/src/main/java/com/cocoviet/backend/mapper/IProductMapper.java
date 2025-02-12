package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.entity.CoconutCategoryEntity;
import com.cocoviet.backend.models.entity.CoconutProductEntity;
import com.cocoviet.backend.models.request.ProductRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface IProductMapper {
    ProductDTO toProductDTO(CoconutProductEntity productEntity);
    List<ProductDTO> toProductDTOList(List<CoconutProductEntity> productEntity);
//    CoconutProductEntity toEntity(ProductRequest productRequest);

}

