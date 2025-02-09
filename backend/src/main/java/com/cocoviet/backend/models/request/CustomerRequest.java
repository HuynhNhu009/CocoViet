package com.cocoviet.backend.models.request;

import java.util.Date;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerRequest {

    Long customerId; // ID của khách hàng, có thể null khi tạo mới

    @NotBlank(message = "Customer name cannot be empty.")
    @Size(min = 3, max = 50, message = "Customer name must be between 3 and 50 characters.")
    String customerName;

    @NotBlank(message = "Password cannot be empty.")
    @Size(min = 8, message = "Password must be at least 8 characters.")
    String customerPassword;

    @NotBlank(message = "Email cannot be empty.")
    @Email(message = "Invalid email format.")
    String customerEmail;

    @NotBlank(message = "Phone number cannot be empty.")
    @Size(min = 10, max = 10, message = "Phone number must be exactly 10 digits.")
    @Pattern(regexp = "\\d+", message = "Phone number must contain only digits.")
    String phoneNumbers;

    String customerAvatar; // avatar - nullable

    @NotBlank(message = "Address cannot be empty.")
    String customerAddress;

    Date createdAt; // nullable


    // [ Thắc mắc nên có Danh sách ID đơn hàng hay không]
    //List<Long> productOrderIds; // Danh sách ID đơn hàng của khách hàng (nếu có)

}

