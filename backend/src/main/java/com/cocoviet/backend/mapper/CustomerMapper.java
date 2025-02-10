package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.CustomerDTO;
import com.cocoviet.backend.models.entity.CustomerEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    CustomerDTO toCustomerDTO(CustomerEntity customerEntity);
}
