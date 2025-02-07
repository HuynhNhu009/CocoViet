package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "retailer")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RetailerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long retailerId;

    @Column
    String retailName;


}