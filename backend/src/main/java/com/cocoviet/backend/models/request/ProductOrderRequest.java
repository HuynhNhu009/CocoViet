package com.cocoviet.backend.models.request;

import java.util.Date;

import jakarta.validation.constraints.NotNull;
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
public class ProductOrderRequest {

    @NotNull(message = "Customer ID cannot be null")
    Long customerId;

    @NotNull(message = "Status ID cannot be null")
    Long statusId;

    @NotNull(message = "Payment ID cannot be null")
    Long paymentId;

    @NotNull(message = "Product order date cannot be null")
    Date productOrderDate;

}

