package com.cocoviet.backend.models.request;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductRequest {

    @NotBlank(message = "Product name cannot be empty")
    @Size(min = 6, max = 50, message = "Product name must be between 6 and 50 characters.")
    String productName;

    @NotBlank(message = "Description cannot be empty")
    @Size(min = 20, max = 500, message = "Product description must be between 20 and 500 characters.")
    String productDesc;

    String retailerId;

    String productImage;

    String productOrigin;

    // Relationship with Unit
    List<ProductVariantsRequest> productVariants;

    // Relationship with category
    Set<String> categoryId;

    LocalDateTime createdAt;
}
