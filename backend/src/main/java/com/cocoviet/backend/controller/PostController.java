package com.cocoviet.backend.controller;

import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.PostRequest;
import com.cocoviet.backend.service.IPostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    IPostService iPostService;

    @PostMapping("/createPost")
    ResponseEntity<ResponseData> createPost(@ModelAttribute PostRequest postRequest,
                                            String folderName) throws IOException {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseData.builder()
                        .data(iPostService.createPost(postRequest, folderName))
                        .msg("Create post " + postRequest.getPostTitle() + "successfully.")
                        .status("OK")
                        .build());
    }
}
