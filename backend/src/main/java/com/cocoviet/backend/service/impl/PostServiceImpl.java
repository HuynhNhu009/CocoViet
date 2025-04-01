package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.mapper.IPostMapper;
import com.cocoviet.backend.models.dto.PostDTO;
import com.cocoviet.backend.models.entity.PostEntity;
import com.cocoviet.backend.models.entity.RetailerEntity;
import com.cocoviet.backend.models.request.PostRequest;
import com.cocoviet.backend.repository.IPostRepository;
import com.cocoviet.backend.repository.IRetailerRepository;
import com.cocoviet.backend.service.IFileUpload;
import com.cocoviet.backend.service.IPostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostServiceImpl implements IPostService {
    @Autowired
    IRetailerRepository iretailerrepository;

    @Autowired
    IPostRepository iPostRepository;

    @Autowired
    IPostMapper iPostMapper;

    @Autowired
    IFileUpload iFileUpload;

    @Override
    public PostDTO createPost(PostRequest postRequest, MultipartFile imageFile) throws IOException {
        RetailerEntity retailerEntity = iretailerrepository.findById(postRequest.getRetailerId())
                .orElseThrow(() -> new RuntimeException("Retailer not found."));

        PostEntity postEntity = PostEntity.builder()
                .postTitle(postRequest.getPostTitle())
                .postContent(postRequest.getPostContent())
                .postImageUrl(iFileUpload.uploadFile(imageFile, "post"))
                .retailer(retailerEntity)
                .publishTime(LocalDateTime.now())
                .productIds(postRequest.getProducts() != null ? postRequest.getProducts() : new HashSet<>())
                .build();

        postEntity = iPostRepository.save(postEntity);
        return iPostMapper.toPostDTO(postEntity);
    }



    @Override
    public PostDTO updatePost(String postId, PostRequest postRequest, MultipartFile imageFile) throws IOException {
        PostEntity postEntity = iPostRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found."));

        if (postRequest.getPostTitle() != null && !postRequest.getPostTitle().isEmpty()) {
            postEntity.setPostTitle(postRequest.getPostTitle());
        }

        if (postRequest.getPostContent() != null && !postRequest.getPostContent().isEmpty()) {
            postEntity.setPostContent(postRequest.getPostContent());
        }

        if (imageFile != null && !imageFile.isEmpty()) {
            String newImageUrl = iFileUpload.uploadFile(imageFile, "post");
            postEntity.setPostImageUrl(newImageUrl);
        }

        if (postRequest.getProducts() != null) {
            postEntity.setProductIds(postRequest.getProducts());
        }

        postEntity = iPostRepository.save(postEntity);
        return iPostMapper.toPostDTO(postEntity);
    }

    @Override
    public PostDTO getPostById(String postId) {
        PostEntity post = iPostRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found."));
        return iPostMapper.toPostDTO(post);
    }

    @Override
    public List<PostDTO> getPostByRetailerId(String retailerId) {
        List<PostEntity> posts = iPostRepository.findByRetailerId(retailerId);
        return iPostMapper.toPostDTOList(posts);
    }
    @Override
    public List<PostDTO> getPostByProductId(String productId) {
        List<PostEntity> posts = iPostRepository.findByProductId(productId);
        return iPostMapper.toPostDTOList(posts);
    }

    @Override
    public List<PostDTO> getAllPosts() {
        return iPostMapper.toPostDTOList(iPostRepository.findAll());
    }

    @Override
    public String deletePostById(String postId) {
        PostEntity postEntity = iPostRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found."));
        iPostRepository.delete(postEntity);
        return "Delete post successfully";
    }
}