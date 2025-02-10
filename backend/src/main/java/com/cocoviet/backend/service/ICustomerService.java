package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.CustomerDTO;
import com.cocoviet.backend.models.request.CustomerRequest;

public interface ICustomerService {
    CustomerDTO registerCustomer(CustomerRequest customerRequest);

}
