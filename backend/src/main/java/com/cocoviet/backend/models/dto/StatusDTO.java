package com.cocoviet.backend.models.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StatusDTO {

    String statusName;

    List<ProductOrderDTO> orders;
}
