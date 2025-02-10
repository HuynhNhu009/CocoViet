package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.service.ICustomerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerServiceImpl implements ICustomerService {

//    ICustomerRepository iCustomerRepository;
//
//    @Override
//    public CustomerResponse registerCustomer(CustomerRequest customerRequest) {
//        if(iCustomerRepository.existsByCustomerEmail(customerRequest.getCustomerEmail())) {
//            throw new RuntimeException("Customer already exists");
//        }
//
//
//    }
}
