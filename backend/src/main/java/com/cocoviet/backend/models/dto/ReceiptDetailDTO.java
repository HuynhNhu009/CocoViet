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
    String productName;
    String productImage;
    int totalQuantity;
    BigDecimal totalPrice;
    String statusName;
    ProductVariantDTO productVariants;
}
