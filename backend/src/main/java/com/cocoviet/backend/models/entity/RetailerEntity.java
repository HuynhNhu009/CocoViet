package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "retailer")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RetailerEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long retailerId;

    @Column
    String retailerName ;

    @Column
    String retailerPassword;

    @Column
    String retailerEmail;

    @Column
    String phoneNumbers;

    @Column
    String retailerAvatar;

    @Column
    String retailerAddress;

    @Column
    Date createdAt;

    @OneToMany(mappedBy = "retailer")
    Set<ProductEntity> products;

    @OneToMany(mappedBy = "retailer")
    Set<PostEntity> posts;


}