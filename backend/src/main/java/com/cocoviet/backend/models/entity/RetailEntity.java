package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "retail")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class RetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long retailId;

    @Column
    String retailName;

//    @Column
//    String retailType;ProductEntity
}