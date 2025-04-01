package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "post")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class PostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String postId;

    @Column(length = 255)
    String postTitle;

    @Column(columnDefinition = "TEXT")  // Đặt kiểu dữ liệu là TEXT cho postContent
    String postContent;

    @Column(nullable = false, updatable = false)
    LocalDateTime publishTime; // Thêm annotation cho thời gian

    @Column
    String postImageUrl;

    @ElementCollection
    @CollectionTable(name = "post_product_ids", joinColumns = @JoinColumn(name = "post_id"))
    @Column(name = "product_id")
    Set<String> productIds = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "retailer_id", nullable = false)
    RetailerEntity retailer;



}