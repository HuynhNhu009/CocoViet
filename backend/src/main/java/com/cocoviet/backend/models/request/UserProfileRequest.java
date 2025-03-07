package com.cocoviet.backend.models.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserProfileRequest {

    @Size(min = 3, max = 50, message = "user name must be between 3 and 50 characters.")
    String userName;
    String userAddress;
    @Size(min = 10, max = 10, message = "Phone number must be exactly 10 digits.")
    @Pattern(regexp = "\\d+", message = "Phone number must contain only digits.")
    String phoneNumbers;
    @Size(min = 8, message = "Password must be at least 8 characters.")
    String userPassword;

    @Email(message = "Invalid email format.")
    String userEmail;



    String userAvatar; // avatar - nullable



    LocalDateTime createdAt; // nullable

}



