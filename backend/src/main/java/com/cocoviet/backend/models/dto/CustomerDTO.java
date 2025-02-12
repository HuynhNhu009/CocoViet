package com.cocoviet.backend.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {

    String customerId;

    String customerName;

    String customerEmail;

    String phoneNumbers;

    String customerAvatar;

    String customerAddress;

    List<ProductOrderDTO> productOrders; // Trả về danh sách Order của Customer
}
