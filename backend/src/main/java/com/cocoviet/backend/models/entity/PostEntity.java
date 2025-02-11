package com.cocoviet.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "post")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class PostEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String postId;

    @Column
    String postTitle;

    @Column
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