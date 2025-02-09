package com.cocoviet.backend.models.reponse;

import java.util.Date;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

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
//    Set<ProductVariantResponse> variants;
}