package com.cocoviet.backend.models.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReceiptDetailDTO {
    String receiptDetailId;

    String retailerName;

    String customerName;

    String customerAddress;

    String customerNumber;

    int quantity;

    BigDecimal price;

    ProductVariantDTO productVariants;
}






