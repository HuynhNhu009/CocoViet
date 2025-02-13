package com.cocoviet.backend.models.request;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "products")
public class ProductRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    String productId;

    @NotBlank(message = "Product name cannot be empty")
    @Size(min = 6, max = 50, message = "Product name must be between 6 and 50 characters.")
    String productName;

    @NotBlank(message = "Description cannot be empty")
    @Size(min = 20, max = 500, message = "Product description must be between 20 and 500 characters.")
    String productDesc;

    Set<String> categoryId;

    String retailerId;

    String productImage;

    String productOrigin;

    LocalDateTime createdAt;
}


