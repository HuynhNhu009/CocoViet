package com.cocoviet.backend.models.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RetailerDTO {
     String retailerId;

    String retailerName;

    String retailerEmail;

    String phoneNumbers;

    String retailerAvatar;

    String retailerAddress;

    Set<ProductDTO> products;

    Set<PostDTO> post;
}
