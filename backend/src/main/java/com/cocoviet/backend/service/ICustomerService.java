package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.AuthenticationDTO;
import com.cocoviet.backend.models.dto.CustomerDTO;
import com.cocoviet.backend.models.request.CustomerRequest;
import com.cocoviet.backend.models.request.UserLoginRequest;
import com.cocoviet.backend.models.request.UserProfileRequest;

import java.util.List;

public interface ICustomerService {
    CustomerDTO registerCustomer(CustomerRequest customerRequest);
    AuthenticationDTO loginCustomer(UserLoginRequest userLoginRequest);
    CustomerDTO updateCustomerProfile(String customerId, UserProfileRequest customerRequest);
    CustomerDTO getCustomer(String customerId);
    List<CustomerDTO> getAllCustomers();
}
