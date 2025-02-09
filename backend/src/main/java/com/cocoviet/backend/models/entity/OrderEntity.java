package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "product_order")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long productOrderId;

    @Column
    Date productOrderDate;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    CustomerEntity customer ;

    @OneToMany(mappedBy = "productOrder")
    List<ReceiptEntity> receiptDetails;

    @ManyToOne
    @JoinColumn(name = "status_id")
    StatusEntity status ;

    @ManyToOne
    @JoinColumn(name = "payment_id")
    PaymentEntity payment ;
}