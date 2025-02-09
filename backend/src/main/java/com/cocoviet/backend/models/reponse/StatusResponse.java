package com.cocoviet.backend.models.reponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StatusResponse {

    String statusName;

    List<ProductOrderResponse> orders;
}
