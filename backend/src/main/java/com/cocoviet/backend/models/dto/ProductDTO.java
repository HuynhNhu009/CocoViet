package com.cocoviet.backend.models.dto;

import lombok.*;

import java.util.Date;

//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//// Data Transfer Object
//public class ProductDTO {
//    private String productName;
//    private String productDesc;
//    private String productEmail;
//    private String productOrigin;
//    private String productImage;
//    private String retailerId;
//    private String retailerName;
//    private String variantId;
//    private String variantName;
//    private Date createAt;
//}

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private String productName;
    private String productDesc;
    private String productImage;
    private String productOrigin;
}
