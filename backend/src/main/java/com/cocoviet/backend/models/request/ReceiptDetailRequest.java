package com.cocoviet.backend.models.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReceiptDetailRequest {

    String productVariantId;

    String orderId;

    String statusCode;

    @Size(min = 1)
    int quantity;
}