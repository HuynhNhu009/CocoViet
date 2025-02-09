package com.cocoviet.backend.models.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RetailerRequest {

    @NotBlank(message = "Retailer name cannot be empty.")
    @Size(min = 6, max = 50, message = "Retailer name must be between 6 and 50 characters.")
    String retailerName ;

    @NotBlank(message = "Password cannot be empty.")
    @Size(min = 8, message = "Password must be at least 8 characters.")
    String retailerPassword;

    @NotBlank(message = "Email cannot be empty.")
    @Email
    String retailerEmail;

    @Size(min = 10, max = 10, message = "Phonenumber must be at 10 characters.")
    String phoneNumbers;

    String retailerAvatar;

    String retailerAddress;

    Date createdAt;
}