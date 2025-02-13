package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.entity.CoconutProductEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IProductMapper {
    @Mapping( source = "retailer.retailerName", target = "retailerName" )
    @Mapping(target = "categoryName", ignore = true)
    ProductDTO toProductDTO(CoconutProductEntity productEntity);

    List<ProductDTO> toProductDTOList(List<CoconutProductEntity> productEntity);
//    CoconutProductEntity toEntity(ProductRequest productRequest);

}

