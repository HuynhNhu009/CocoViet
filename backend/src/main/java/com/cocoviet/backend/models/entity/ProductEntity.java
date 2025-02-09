package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "product")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long productId;

    @Column
    String productName;

    @Column(columnDefinition = "TEXT")
    String productDesc;

    // @Column
    // int productStock;

    @Column
    String productImage;

    @Column
    String productOrigin;

    @Column
    Date createdAt;


    @ManyToOne
    @JoinColumn(name = "retailer_id")
    RetailerEntity retailer;

    @ManyToOne
    @JoinColumn(name = "category_id")
    CategoryEntity category;

    @OneToMany(mappedBy = "product")
    Set<ProductVariantsEntity> variants;

    @OneToMany(mappedBy = "product")
    Set<ReceiptDetailEntity> receiptDetails;

}