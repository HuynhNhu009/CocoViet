package com.cocoviet.backend.models.request;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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


