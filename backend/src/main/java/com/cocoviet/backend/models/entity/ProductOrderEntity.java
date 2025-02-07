package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "product_order")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ProductOrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long productOrderId;

    @Column
    Date productOrderDate;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    CustomerEntity customer ;

    @ManyToMany(mappedBy = "productOrders")
    Set<ProductEntity> products ;

    @ManyToOne
    @JoinColumn(name = "status_id")
    StatusEntity status ;

    @ManyToOne
    @JoinColumn(name = "payment_id")
    PaymentEntity payment ;


}