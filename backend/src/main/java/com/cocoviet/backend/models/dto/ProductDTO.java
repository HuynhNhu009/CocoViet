package com.cocoviet.backend.models.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
     String productId;
     String productName;
     String productDesc;
     String productImage;
     String productOrigin;
     String status;
     Set<String> categoryName;
     String retailerName;
     LocalDateTime createdAt;
     Set<ProductVariantDTO> variants;
}
