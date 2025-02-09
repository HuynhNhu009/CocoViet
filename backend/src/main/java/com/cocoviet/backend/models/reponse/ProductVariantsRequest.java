package com.cocoviet.backend.models.reponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductVariantsResponse {

    Long productVariantsId;
    ProductResponse product;
    UnitResponse unit;
    double size;
    double price;
}
