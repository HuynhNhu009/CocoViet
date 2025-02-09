package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "product_variants")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ProductVariantsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long productVariantsId;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    ProductEntity product;

    @ManyToOne
    @JoinColumn(name = "unit_id", nullable = false)
    UnitEntity unit;

    @Column
    double value; // 100

    @Column
    double price; // BigDecimal

    @Column
    int stock;
}