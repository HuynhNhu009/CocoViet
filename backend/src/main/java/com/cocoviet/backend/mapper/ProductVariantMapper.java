package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.ProductVariantDTO;
import com.cocoviet.backend.models.entity.ProductVariantEntity;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ProductVariantMapper {

        public ProductVariantDTO toDTO(ProductVariantEntity variant) {
            return ProductVariantDTO.builder()
                    .variantId(variant.getVariantsId())
                    .unitName(variant.getUnit().getUnitName())
                    .price(variant.getPrice())
                    .initStock(variant.getInitStock())
                    .stock(variant.getStock())
                    .value(variant.getValue())
                    .build();
        }

        public Set<ProductVariantDTO> toDTOSet(Set<ProductVariantEntity> variants) {
            return variants.stream().map(this::toDTO).collect(Collectors.toSet());
        }


}

