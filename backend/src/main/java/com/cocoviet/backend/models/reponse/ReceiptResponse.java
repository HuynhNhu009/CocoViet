package com.cocoviet.backend.models.reponse;

import com.cocoviet.backend.models.entity.ProductEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReceiptResponse {
    String retailerName ;
    String customerAddress ;
    String customerNumber;
    int quantity;
    double price;
    String unitPrice;
    double totalPrice;
    Set<ProductEntity> products;

}
