package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.mapper.ICustommerMapper;
import com.cocoviet.backend.models.dto.CustomerDTO;
import com.cocoviet.backend.models.entity.CustomerEntity;
import com.cocoviet.backend.models.request.CustomerRequest;
import com.cocoviet.backend.repository.ICustomerRepository;
import com.cocoviet.backend.service.ICustomerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerServiceImpl implements ICustomerService {

    ICustomerRepository iCustomerRepository;
    ICustommerMapper iCustommerMapper;

    @Override
    public CustomerDTO registerCustomer(CustomerRequest customerRequest) {
        if(iCustomerRepository.existsByCustomerEmail(customerRequest.getCustomerEmail())) {
            throw new RuntimeException("Customer already exists");
        }
        CustomerEntity customerEntity = CustomerEntity.builder()
                .customerEmail(customerRequest.getCustomerEmail())
                .customerAddress(customerRequest.getCustomerAddress())
                .customerName(customerRequest.getCustomerName())
                .customerPassword(customerRequest.getCustomerPassword())
                .phoneNumbers(customerRequest.getPhoneNumbers())
                .customerAvatar(customerRequest.getCustomerAvatar())
                .build();

        return iCustommerMapper.toCustomerDTO(iCustomerRepository.save(customerEntity));
    }
}
