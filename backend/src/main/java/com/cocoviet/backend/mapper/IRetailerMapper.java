package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.RetailerDTO;
import com.cocoviet.backend.models.entity.RetailerEntity;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface IRetailerMapper {
    RetailerDTO toRetailerDTO(RetailerEntity retailerEntity);
    List<RetailerDTO> toListRetailerDTO(List<RetailerEntity> retailerEntities);
    Set<RetailerDTO> toSetRetailerDTO(Set<RetailerEntity> retailerEntitySet);
}
