package com.cocoviet.backend.models.reponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RetailerResponse {
    String retailerName;

    String retailerEmail;

    String phoneNumbers;

    String retailerAvatar;

    String retailerAddress;

    Set<ProductResponse> products;

    Set<PostResponse> post;
}
