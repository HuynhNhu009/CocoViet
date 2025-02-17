package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.PostDTO;
import com.cocoviet.backend.models.request.PostRequest;

public interface IPostService {
    PostDTO createPost(PostRequest postRequest);
}
