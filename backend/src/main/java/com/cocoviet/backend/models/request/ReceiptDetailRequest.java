package com.cocoviet.backend.models.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReceiptDetailRequest {

    String productVariantId;

    String orderId;

    BigDecimal price;

    @Size(min = 1)
    int quantity;
}