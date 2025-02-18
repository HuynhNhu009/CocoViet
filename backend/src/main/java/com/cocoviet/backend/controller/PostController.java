package com.cocoviet.backend.controller;

import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.PostRequest;
import com.cocoviet.backend.service.IPostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    IPostService iPostService;

    @PostMapping("/createPost")
    ResponseEntity<ResponseData> createPost(@RequestBody @Valid PostRequest postRequest) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseData.builder()
                        .data(iPostService.createPost(postRequest))
                        .msg("Create post " + postRequest.getPostTitle() + "successfully.")
                        .status("OK")
                        .build());
    }

    @GetMapping("/{postId}")
    ResponseEntity<ResponseData> getPost(@PathVariable("postId") String postId){

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseData.builder()
                        .data(iPostService.getPostById(postId))
                        .msg("Get post Id: " + postId + "successfully")
                        .status("OK")
                        .build());
    }
//    @GetMapping("/get-all-posts")
//    ResponseEntity<ResponseData> getAllPost(){
//        return ResponseEntity.status(HttpStatus.CREATED)
//                .body(ResponseData.builder()
//                        .data(iPostService.get).build());
//    }
}
