package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "product_orders")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String orderId; // Đổi từ productOrderId → orderId

    @Column(nullable = false)
    LocalDateTime orderDate; // Đổi tên từ productOrderDate → orderDate

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    CustomerEntity customer;

    @ManyToOne
    @JoinColumn(name = "status_id", nullable = false)
    StatusEntity status;

    @ManyToOne
    @JoinColumn(name = "payment_id", nullable = false)
    PaymentEntity payment;

    @OneToMany(mappedBy = "productOrder", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<ReceiptDetailEntity> receiptDetails;
}
