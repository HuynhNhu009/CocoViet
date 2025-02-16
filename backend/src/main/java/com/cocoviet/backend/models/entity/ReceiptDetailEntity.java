package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "receipt")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReceiptDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String receiptDetailId;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false) // Đổi từ productOrder_id → order_id
    OrderEntity productOrder;

    @ManyToOne
    @JoinColumn(name = "variant_id", nullable = false)
    ProductVariantEntity productVariant;

    @Column(nullable = false)
    int  quantity;

    @Column(nullable = false)
    BigDecimal price;
}
