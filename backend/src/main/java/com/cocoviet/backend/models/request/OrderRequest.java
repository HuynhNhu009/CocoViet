package com.cocoviet.backend.models.request;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;

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
public class OrderRequest {

    @NotNull(message = "Customer ID cannot be null")
    String customerId;

    @NotNull(message = "Status ID cannot be null")
    String statusId;

    @NotNull(message = "Payment ID cannot be null")
    String paymentId;

    List<ReceiptDetailRequest> receiptDetailRequests;

    LocalDateTime orderDate;

}

