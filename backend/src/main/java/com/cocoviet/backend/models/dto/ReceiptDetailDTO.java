package com.cocoviet.backend.models.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReceiptDetailDTO {

    String retailerName;

    String customerName;

    String customerAddress;

    String customerNumber;

    int quantity;

    String unitPrice;

    Set<ProductVariantDTO> productVariants;
}






