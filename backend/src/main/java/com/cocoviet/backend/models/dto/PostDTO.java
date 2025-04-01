package com.cocoviet.backend.models.dto;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostDTO {

    String postId;

    String postTitle;

    String postContent;

    String postImageUrl;

    String authorPost; // retailer

    LocalDateTime publishTime;

    String authorId;

    Set<String> productIds = new HashSet<>();
}
