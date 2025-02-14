package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.StatusDTO;
import com.cocoviet.backend.models.entity.StatusEntity;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface IStatusMapper {
    StatusDTO toStatusDTO(StatusEntity statusEntity);
    Set<StatusDTO> toStatusDTOList(List<StatusEntity> statusEntityList);
}
