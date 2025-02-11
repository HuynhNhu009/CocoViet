package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.CustomerDTO;
import com.cocoviet.backend.models.entity.CustomerEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ICustomerMapper {
    CustomerDTO toCustomerDTO(CustomerEntity customerEntity);
    List<CustomerDTO> toCustomerDTOList(List<CustomerEntity> customerEntitySet);

}
