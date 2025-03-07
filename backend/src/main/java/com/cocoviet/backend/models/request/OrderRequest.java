package com.cocoviet.backend.models.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderRequest {

//    @NotNull(message = "Customer ID cannot be null")
    String customerId;
    String customerName;

    String customerAddress;

    String customerNumber;

    String paymentCode;

    List<ReceiptDetailRequest> receiptDetailRequests;

    LocalDateTime orderDate;

}
