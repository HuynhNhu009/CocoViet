package com.cocoviet.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cocoviet.backend.models.entity.PostEntity;

public interface IPostRepository extends JpaRepository<PostEntity, String> {

}
