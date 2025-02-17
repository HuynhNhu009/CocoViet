package com.cocoviet.backend.models.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

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

    String productName;

    int totalQuantity;

    BigDecimal totalPrice;

    ProductVariantDTO productVariants;
}
