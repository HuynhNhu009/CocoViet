package com.cocoviet.backend.models.reponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReceiptDetailResponse {

    String retailerName;

    String customerName;

    String customerAddress;

    String customerNumber;

    int quantity;

    String unitPrice;

    Set<ProductVariantResponse> productVariants;
}






