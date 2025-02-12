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
     LocalDateTime createdAt;
     //anh
     Set<String> categoryName;
     String retailerName;
}
