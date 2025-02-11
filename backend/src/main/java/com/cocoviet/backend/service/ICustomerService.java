package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.CustomerDTO;
import com.cocoviet.backend.models.request.CustomerRequest;
import com.cocoviet.backend.models.request.UserLoginRequest;

import java.util.List;

public interface ICustomerService {
    CustomerDTO registerCustomer(CustomerRequest customerRequest);
    CustomerDTO loginCustomer(UserLoginRequest userLoginRequest);
    CustomerDTO updateCustomerProfile(String customerId, CustomerRequest customerRequest);
    CustomerDTO getCustomer(String customerId);
    List<CustomerDTO> getAllCustomers();
}
