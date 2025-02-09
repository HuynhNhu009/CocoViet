package com.cocoviet.backend.models.request;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
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
    String productName;

    @NotBlank(message = "Description cannot be empty")
    @Column(columnDefinition = "TEXT")
    String productDesc;

    @NotNull(message = "productStock cannot be null")
    @Min(value = 0, message = "productStock greater than or equal to 0")
    int productStock;

    @NotBlank(message = "Category cannot be empty")
    String category;

    String productImage;

    String productOrigin;

    Date createdAt;

}


