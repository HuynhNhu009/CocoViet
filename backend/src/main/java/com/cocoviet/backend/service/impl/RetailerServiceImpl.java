package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.mapper.IRetailerMapper;
import com.cocoviet.backend.models.dto.AuthenticationDTO;
import com.cocoviet.backend.models.dto.RetailerDTO;
import com.cocoviet.backend.models.entity.RetailerEntity;
import com.cocoviet.backend.models.request.RetailerRequest;
import com.cocoviet.backend.models.request.UserLoginRequest;
import com.cocoviet.backend.models.request.UserProfileRequest;
import com.cocoviet.backend.repository.IRetailerRepository;
import com.cocoviet.backend.service.IFileUpload;
import com.cocoviet.backend.service.IRetailerService;
import com.cocoviet.backend.utils.JwtToken;
import com.cocoviet.backend.utils.PasswordEncoderUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RetailerServiceImpl implements IRetailerService {

    @Autowired
    IRetailerRepository iRetailerRepository;

    @Autowired
    IRetailerMapper iRetailerMapper;

    @Autowired
    JwtToken jwtToken;

    @Autowired
    PasswordEncoderUtil passwordEncoderUtil;

//    @Autowired
//    IFileUpload iFileUpload;


    @Override
    public RetailerDTO registerRetailer(RetailerRequest retailerRequest) {

        if(iRetailerRepository.existsByRetailerEmail(retailerRequest.getRetailerEmail())) {
            throw new RuntimeException( "Retailer already exists");
        };
        RetailerEntity retailer = RetailerEntity.builder()
                .retailerEmail(retailerRequest.getRetailerEmail())
                .phoneNumbers(retailerRequest.getPhoneNumbers())
                .retailerName(retailerRequest.getRetailerName())
                .retailerAvatar(retailerRequest.getRetailerAvatar())
                .createdAt(LocalDateTime.now())
                .retailerAddress(retailerRequest.getRetailerAddress())
                .retailerPassword(passwordEncoderUtil.passwordEncoder().encode(retailerRequest.getRetailerPassword()))
                .build();
        return iRetailerMapper.toRetailerDTO(iRetailerRepository.save(retailer));

    }


    @Override
    public AuthenticationDTO loginRetailer(UserLoginRequest userLoginRequest) {
        RetailerEntity retailer =  iRetailerRepository.findByRetailerEmail(userLoginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Retailer not found"));

        boolean result = passwordEncoderUtil.passwordEncoder().matches(userLoginRequest.getPassword(),retailer.getRetailerPassword());

        if(!result)
            throw new RuntimeException("Password incorrect!");
        var token = jwtToken.generateToken(retailer.getRetailerEmail());

        AuthenticationDTO authenticationDTO = new AuthenticationDTO();
        authenticationDTO.setToken(token);

        authenticationDTO.setData(iRetailerMapper.toRetailerDTO(retailer));
        return authenticationDTO ;
    }

    @Override
    public RetailerDTO updateRetailerProfile(String retailerId, UserProfileRequest userProfileRequest) {

        RetailerEntity retailer = iRetailerRepository.findById(retailerId)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));

        retailer.setRetailerName(userProfileRequest.getUserName());
        retailer.setRetailerAddress(userProfileRequest.getUserAddress());
        retailer.setPhoneNumbers(userProfileRequest.getPhoneNumbers());
        retailer.setRetailerAvatar(userProfileRequest.getUserAvatar());

        return iRetailerMapper.toRetailerDTO(iRetailerRepository.save(retailer));
    }

    @Override
    public RetailerDTO getRetailer(String retailerId) {
        RetailerEntity retailer = iRetailerRepository.findById(retailerId)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));
        return iRetailerMapper.toRetailerDTO(retailer);
    }

    @Override
    public List<RetailerDTO> getAllRetailer() {
        return iRetailerMapper.toListRetailerDTO(iRetailerRepository.findAll());
    }


}
