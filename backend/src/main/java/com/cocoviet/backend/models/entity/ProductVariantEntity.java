package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Entity
@Table(name = "product_variants")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ProductVariantEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String variantsId;

    @Column
    double value; // 100

    @Column
    BigDecimal price; // BigDecimal

    @Column
    int stock;

    @Column
    int initStock;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    ProductEntity product;

    @ManyToOne
    @JoinColumn(name = "unit_id", nullable = false)
    UnitEntity unit;
}