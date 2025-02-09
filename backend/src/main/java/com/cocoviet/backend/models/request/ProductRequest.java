package com.cocoviet.backend.models.request;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

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
    Long productId;

    @NotBlank(message = "Product name cannot be empty")
    @Size(min = 6, max = 50, message = "Product name must be between 6 and 50 characters.")
    String productName;

    @NotBlank(message = "Description cannot be empty")
    @Size(min = 20, max = 500, message = "Product description must be between 20 and 500 characters.")
    String productDesc;

    @NotNull(message = "Stock cannot be null")
    @Min(value = 1, message = "Stock greater than or equal to 0")
    int productStock;

    String categoryId;

    String productImage;

    String productOrigin;

    Date createdAt;
}


