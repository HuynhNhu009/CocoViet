package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Entity
@Table(name = "payment")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class PaymentEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String paymentId;

    @Column
    String paymentMethod;
}