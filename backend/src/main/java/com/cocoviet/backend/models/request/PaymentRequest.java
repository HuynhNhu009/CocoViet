package com.cocoviet.backend.models.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentRequest {

    @NotBlank(message = "Customer name cannot be empty.")
    @Size(min = 6, max = 50, message = "Customer name must be between 6 and 50 characters.")
    String paymentMethod;
}
