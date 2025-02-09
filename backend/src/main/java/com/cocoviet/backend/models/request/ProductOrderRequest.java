package com.cocoviet.backend.models.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductOrderRequest {

    @NotNull(message = "Product order date cannot be null")
    Date productOrderDate;

    @NotNull(message = "Customer ID cannot be null")
    Long customerId;

    @NotNull(message = "Status ID cannot be null")
    Long statusId;

    @NotNull(message = "Payment ID cannot be null")
    Long paymentId;

    @NotNull(message = "Receipt details cannot be null")
    List<ReceiptDetailRequest> receiptDetails;
}

