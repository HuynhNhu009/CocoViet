package com.cocoviet.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IProductMapper {

    @Mapping(source = "product")



}
