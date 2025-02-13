package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.StatusDTO;
import com.cocoviet.backend.models.entity.StatusEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IStatusMapper {
    StatusDTO toStatusDTO(StatusEntity statusEntity);
}
