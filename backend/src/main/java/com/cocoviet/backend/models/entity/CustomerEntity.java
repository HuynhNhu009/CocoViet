package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "customer")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long customerId;

    @Column
    String customerName ;

    @Column
    String customerPassword;

    @Column
    String customerEmail;

    @Column
    String phoneNumbers;

    @Column
    String customerAvatar;

    @Column
    String customerAddress;

    @Column
    Date createdAt;

    @OneToMany(mappedBy = "customer")
    List<OrderEntity> productOrders;

}