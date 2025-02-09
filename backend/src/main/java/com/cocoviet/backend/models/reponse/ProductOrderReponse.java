package com.cocoviet.backend.models.reponse;

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
public class ProductOrderResponse {

    Long productOrderId;
    Date productOrderDate;

    CustomerResponse customer;
    List<ReceiptDetailResponse> receiptDetails;
    StatusResponse status;
    PaymentResponse payment;
}