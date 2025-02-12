package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "product")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class CoconutProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String productId;

    @Column
    String productName;

    @Column(columnDefinition = "TEXT")
    String productDesc;

    @Column
    String productImage;

    @Column
    String productOrigin;

    @Column
    LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "retailer_id") // Liên kết đến RetailerEntity
    RetailerEntity retailer;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<CoconutProductVariantEntity> variants;

    //anh
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<ProductCategoryEntity> productCategories ;
}