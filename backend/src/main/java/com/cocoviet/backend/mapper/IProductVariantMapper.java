package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.dto.ProductVariantDTO;
import com.cocoviet.backend.models.entity.ProductEntity;
import com.cocoviet.backend.models.entity.ProductVariantEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface IProductVariantMapper {

//    Set<ProductVariantDTO> toProductVariantDTOSet(Set<ProductVariantEntity> productVariantEntities);

}

