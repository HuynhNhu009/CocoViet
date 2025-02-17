package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

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

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    LocalDateTime publishTime; // Thêm annotation cho thời gian

    @Column
    String postImageUrl;

    @ManyToOne
    @JoinColumn(name = "retailer_id", nullable = false)
    RetailerEntity retailer;
}