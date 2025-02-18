package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.PostDTO;
import com.cocoviet.backend.models.entity.PostEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IPostMapper {

    PostDTO toPostDTO(PostEntity postEntity);
}
