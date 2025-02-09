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

public class ReceiptEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long receiptDetailId;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    CoconutProductEntity product;

    @ManyToOne
    @JoinColumn(name = "productOrder_id", nullable = false)
    OrderEntity productOrder;

    @Column
    int quantity;

}