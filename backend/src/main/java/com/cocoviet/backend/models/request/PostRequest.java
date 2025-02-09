package com.cocoviet.backend.models.request;


import java.util.Date;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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

public class PostRequest {

    @NotBlank(message = "Customer name cannot be empty.")
    @Size(min = 10, max = 100, message = "Post title must be between 10 and 100 characters.")
    String postTitle;

    @NotBlank(message = "Post content name cannot be empty.")
    @Size(min = 20, max = 500, message = "Post content must be between 20 and 500 characters.")
    String postContent;

    Date publishedDate;

    String postImageUrl; // Nullable

    String retailerId; //
}
