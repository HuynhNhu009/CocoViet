package com.cocoviet.backend.models.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
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

    @Size(min = 8, message = "Retailer name must be at least 8 characters.")
    String retailerName ;

    @Size(min = 8, message = "Password must be at least 8 characters.")
    String retailerPassword;

    @Email
    String retailerEmail;

    @Size(min = 10, max = 10, message = "Phonenumber must be at 10 characters.")
    String phoneNumbers;

    String retailerAvatar;

    String retailerAddress;

    Date createdAt;
}