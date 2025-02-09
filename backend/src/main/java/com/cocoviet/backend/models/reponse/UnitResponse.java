package com.cocoviet.backend.models.reponse;

import com.cocoviet.backend.models.entity.ProductVariantsEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UnitResponse {
    String unitName;
}
