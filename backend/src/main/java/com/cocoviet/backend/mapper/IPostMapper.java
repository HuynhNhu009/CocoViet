package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.PostDTO;
import com.cocoviet.backend.models.entity.PostEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IPostMapper {
    @Mapping(source = "retailer.retailerName", target = "authorPost")
    PostDTO toPostDTO(PostEntity postEntity);

//    List<PostDTO> toPostDTOList(List )
}
