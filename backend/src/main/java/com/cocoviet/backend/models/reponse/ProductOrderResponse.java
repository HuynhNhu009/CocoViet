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

    List<ReceiptDetailResponse> receiptDetails;

    String statusName;

    Date productOrderDate;
}