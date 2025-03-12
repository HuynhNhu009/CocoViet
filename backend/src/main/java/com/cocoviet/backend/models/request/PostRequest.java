package com.cocoviet.backend.models.request;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

public class PostRequest {

    @NotBlank(message = "Customer name cannot be empty.")
    @Size(min = 10, max = 255, message = "Post title must be between 10 and 100 characters.")
    String postTitle;

    @NotBlank(message = "Post content name cannot be empty.")
    @Size(min = 20, max = 5000, message = "Post content must be between 20 and 500 characters.")
    String postContent;

    String retailerId; //

}
