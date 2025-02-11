package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.mapper.ICustomerMapper;
import com.cocoviet.backend.models.dto.CustomerDTO;
import com.cocoviet.backend.models.entity.CustomerEntity;
import com.cocoviet.backend.models.request.CustomerRequest;
import com.cocoviet.backend.repository.ICustomerRepository;
import com.cocoviet.backend.service.ICustomerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerServiceImpl implements ICustomerService {

    @Autowired
    ICustomerRepository iCustomerRepository;

    @Autowired
    ICustomerMapper iCustomerMapper;

    @Override
    public CustomerDTO registerCustomer(CustomerRequest customerRequest) {
        if(iCustomerRepository.existsByCustomerEmail(customerRequest.getCustomerEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Customer email already exists");
        };
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        CustomerEntity customerEntity = CustomerEntity.builder()
                    .customerEmail(customerRequest.getCustomerEmail())
                    .customerAddress(customerRequest.getCustomerAddress())
                    .customerName(customerRequest.getCustomerName())
                    .customerPassword(passwordEncoder.encode(customerRequest.getCustomerPassword()))
                    .phoneNumbers(customerRequest.getPhoneNumbers())
                    .customerAvatar(customerRequest.getCustomerAvatar())
                    .build();
            return iCustomerMapper.toCustomerDTO(iCustomerRepository.save(customerEntity));
    }

//    @Autowired
//    public String loginCustomer(String customerEmail, String customerPassword) {
//        var customer =  iCustomerRepository.findByCustomerEmail(customerEmail)
//
//        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        boolean result = passwordEncoder.matches(userRequest.getPassword(), user.getPassword());
//
//        if(!result)
//            throw new AppException(ErrorCode.UNAUTHENTICATED);
//
//        //utils jwtNimbusd.generateToken(user);
//        var token = jwtNimbusd.generateToken(user);

//        return  AuthenticationDTO.builder()
//                .authenticated(true)
//                .token(token)
//                .build();
//        return "ok";
//    }
}
