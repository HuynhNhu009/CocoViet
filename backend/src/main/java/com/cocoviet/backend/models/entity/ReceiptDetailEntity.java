package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Entity
@Table(name = "receipt_detail")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ReceiptDetailEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long receiptDetailId;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    ProductEntity product;

    @ManyToOne
    @JoinColumn(name = "productOrder_id", nullable = false)
    ProductOrderEntity productOrder;

    @Column
    int quantity;

}