package com.cocoviet.backend.models.dto;

import lombok.*;

import java.time.LocalDateTime;

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
     String categoryId;
     String retailerId;
}
