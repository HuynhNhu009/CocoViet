package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.AuthenticationDTO;
import com.cocoviet.backend.models.dto.RetailerDTO;
import com.cocoviet.backend.models.request.RetailerRequest;
import com.cocoviet.backend.models.request.UserLoginRequest;
import com.cocoviet.backend.models.request.UserProfileRequest;

import java.io.IOException;
import java.util.List;

public interface IRetailerService {
    RetailerDTO registerRetailer(RetailerRequest retailerRequest);
    AuthenticationDTO loginRetailer(UserLoginRequest userLoginRequest);
    RetailerDTO updateRetailerProfile(String retailerId, UserProfileRequest retailerProfileRequest);
    RetailerDTO getRetailer(String retailerId);
    RetailerDTO getRetailerEmail(String retailerEmail);
    List<RetailerDTO> getAllRetailer();
}
