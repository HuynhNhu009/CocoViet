package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.PostDTO;
import com.cocoviet.backend.models.request.PostRequest;

import java.io.IOException;

public interface IPostService {
    PostDTO createPost(PostRequest postRequest) throws IOException;
    PostDTO getPostById(String  postId);
//    PostDTO getAllPosts();
}
