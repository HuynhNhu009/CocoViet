package com.cocoviet.backend.models.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RetailerRequest {

    String retailerName;

    String retailerPassword;

    String retailerEmail;

    String phoneNumbers;

    String retailerAvatar;

    String retailerAddress;

    Date createdAt;
}