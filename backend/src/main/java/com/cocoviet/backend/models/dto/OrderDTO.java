package com.cocoviet.backend.models.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDTO {
    String orderId;
    Set<ReceiptDetailDTO> receiptDetails;
    String customerName;
    String customerAddress;
    String customerNumber;
    String statusName;
    String paymentMethod;

    LocalDateTime orderDate;
}