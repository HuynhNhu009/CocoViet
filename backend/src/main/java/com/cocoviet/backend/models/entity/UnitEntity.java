package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.List;
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
    @GeneratedValue(strategy = GenerationType.UUID)
    String unitId;

    @Column
    String unitName;

    @ManyToMany(mappedBy = "units")
    Set<RetailerEntity> retailers;

    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<ProductVariantEntity> variants;
}