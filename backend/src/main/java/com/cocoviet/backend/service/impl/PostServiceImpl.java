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

import java.io.IOException;
import java.time.LocalDateTime;
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
    public PostDTO createPost(PostRequest postRequest)  {

        RetailerEntity retailerEntity = iretailerrepository.findById(postRequest.getRetailerId())
                .orElseThrow(()-> new RuntimeException("Retailer not found."));

        PostEntity postEntity = PostEntity.builder()
                .postTitle(postRequest.getPostTitle())
                .postContent(postRequest.getPostContent())
                .postImageUrl(postRequest.getPostImageFile())
                .retailer(retailerEntity)
                .publishTime(LocalDateTime.now())
                .build();

        postEntity = iPostRepository.save(postEntity);

        return iPostMapper.toPostDTO(postEntity);
    }

    @Override
    public PostDTO getPostById(String postId){
        PostEntity post = iPostRepository.findById(postId)
                .orElseThrow(()-> new RuntimeException("Post not found."));
        return iPostMapper.toPostDTO(post);
    }
}
