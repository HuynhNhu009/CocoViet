package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.AdminDTO;
import com.cocoviet.backend.models.entity.AdminEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IAdminMapper {
    AdminDTO toAdminDTO(AdminEntity adminEntity);

}
