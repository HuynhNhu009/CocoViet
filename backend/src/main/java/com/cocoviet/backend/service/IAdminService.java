package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.CustomerDTO;
import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.dto.RetailerDTO;

import java.util.List;

public interface IAdminService {

    List<CustomerDTO> getAllCustomers();
    List<ProductDTO> getAllProducts ();
    List<RetailerDTO> getAllRetailers ();
}
