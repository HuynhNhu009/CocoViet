package com.cocoviet.backend.models.dto;

import com.cocoviet.backend.models.entity.ProductVariantEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BestSellingProductDTO {
    private ProductVariantDTO productVariant;
    private Long totalSold;
}
