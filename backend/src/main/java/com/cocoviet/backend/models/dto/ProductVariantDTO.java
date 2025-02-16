package com.cocoviet.backend.models.dto;

import com.cocoviet.backend.models.entity.UnitEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductVariantDTO {

    String variantId;
    double value;

    int stock;

    int initStock;

    BigDecimal price;

    String unitName;
}