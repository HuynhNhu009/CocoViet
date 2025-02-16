package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.entity.ProductEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IOrderMapper {
    @Mapping( source = "retailer.retailerName", target = "retailerName" )
    @Mapping(target = "categoryName", ignore = true)
    ProductDTO toProductDTO(ProductEntity productEntity);

    List<ProductDTO> toProductDTOList(List<ProductEntity> productEntity);
//    CoconutProductEntity toEntity(ProductRequest productRequest);

}

