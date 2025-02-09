package com.cocoviet.backend.models.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StatusRequest {
    @Size(min = 10, message = "Status name must be at least 10 characters.")
    String statusName;
}