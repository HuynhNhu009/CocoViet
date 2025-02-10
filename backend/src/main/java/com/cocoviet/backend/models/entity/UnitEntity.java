package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.aspectj.weaver.Lint;
import org.w3c.dom.stylesheets.LinkStyle;

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

    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<CoconutProductVariantEntity> variants;
}