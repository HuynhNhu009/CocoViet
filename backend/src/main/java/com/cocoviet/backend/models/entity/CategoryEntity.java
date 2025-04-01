package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Entity
@Table(name = "category")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String categoryId;

    @Column
    String categoryName;
}