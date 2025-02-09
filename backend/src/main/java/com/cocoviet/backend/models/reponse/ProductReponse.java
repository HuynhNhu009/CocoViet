package com.cocoviet.backend.models.reponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {

    Long productId;
    String productName;
    String productDesc;
    int productStock;
    String productImage;
    String productOrigin;
    Date createdAt;

    RetailerResponse retailer;
    CategoryResponse category;
    Set<ProductVariantResponse> variants;
}