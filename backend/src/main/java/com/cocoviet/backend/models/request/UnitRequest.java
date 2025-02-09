package com.cocoviet.backend.models.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UnitRequest {
    @Size(min = 1, message = "Unit name must be at least 1 characters.")
    String unitName;

}