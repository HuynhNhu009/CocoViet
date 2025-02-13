package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "product_category")  // Bảng trung gian
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductCategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id; // ID riêng cho bảng trung gian

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    ProductEntity product;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    CategoryEntity category;
}
