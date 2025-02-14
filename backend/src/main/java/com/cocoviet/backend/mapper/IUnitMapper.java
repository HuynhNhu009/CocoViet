package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.UnitDTO;
import com.cocoviet.backend.models.entity.UnitEntity;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface IUnitMapper {

    UnitDTO toUnitDTO(UnitEntity unitEntity);
    Set<UnitDTO> toSetUnitDTO(List<UnitEntity> unitEntity);
}

