package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "unit")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class UnitEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long unitId;

    @Column
    String unitName;

    @OneToMany(mappedBy = "unit")
    Set<CoconutProductVariantsEntity> variants;

}