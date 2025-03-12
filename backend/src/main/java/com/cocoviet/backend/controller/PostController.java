package com.cocoviet.backend.controller;

import com.cocoviet.backend.models.dto.PostDTO;
import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.PostRequest;
import com.cocoviet.backend.models.request.ProductRequest;
import com.cocoviet.backend.service.IPostService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    IPostService iPostService;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping(value = "", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    ResponseEntity<ResponseData> createPost( @RequestPart("post") String postJson,@RequestPart("image") MultipartFile imageFile) throws IOException {

        PostRequest postRequest = objectMapper.readValue(postJson, PostRequest.class);
        PostDTO postDTO = iPostService.createPost(postRequest, imageFile);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseData.builder()
                        .data(postDTO)
                        .msg("Create post " + postRequest.getPostTitle() + "successfully.")
                        .status("OK")
                        .build());
    }

    @PatchMapping(value = "/{postId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    ResponseEntity<ResponseData> updatePost(@PathVariable("postId") String postId,
                                            @RequestPart(value = "post", required = false) String postJson,
                                @RequestPart(value = "image", required = false) MultipartFile imageFile) throws IOException {

        PostRequest postRequest = (postJson != null) ?
                objectMapper.readValue(postJson, PostRequest.class)
                : new PostRequest();
        PostDTO postDTO = iPostService.updatePost(postId,postRequest, imageFile);

    return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseData.builder()
                        .data(postDTO)
                        .msg("Update post " + postRequest.getPostTitle() + "successfully.")
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

    @GetMapping("/get-all-posts")
    ResponseEntity<ResponseData> getAllPost(){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseData.builder()
                        .data(iPostService.getAllPosts())
                        .msg("Get all post successfully")
                        .status("OK")
                        .build());
    }

    @GetMapping()
    ResponseEntity<ResponseData> getPostsByRetailerId(@RequestParam("retailerId") String retailerId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(iPostService.getPostByRetailerId(retailerId))
                        .msg("Get all post by retailerId: " + retailerId)
                        .status("OK")
                        .build());
    }

}
