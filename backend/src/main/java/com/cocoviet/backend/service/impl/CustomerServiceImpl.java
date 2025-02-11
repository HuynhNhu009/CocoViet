package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.mapper.ICustomerMapper;
import com.cocoviet.backend.models.dto.CustomerDTO;
import com.cocoviet.backend.models.entity.CustomerEntity;
import com.cocoviet.backend.models.request.CustomerRequest;
import com.cocoviet.backend.models.request.UserLoginRequest;
import com.cocoviet.backend.models.request.UserProfileRequest;
import com.cocoviet.backend.repository.ICustomerRepository;
import com.cocoviet.backend.service.ICustomerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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
            throw new RuntimeException( "Customer email already exists");
        };
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        CustomerEntity customerEntity = CustomerEntity.builder()
                    .customerEmail(customerRequest.getCustomerEmail())
                    .customerAddress(customerRequest.getCustomerAddress())
                    .customerName(customerRequest.getCustomerName())
                    .customerPassword(passwordEncoder.encode(customerRequest.getCustomerPassword()))
                    .phoneNumbers(customerRequest.getPhoneNumbers())
                    .customerAvatar(customerRequest.getCustomerAvatar())
                    .createdAt(LocalDateTime.now())
                    .build();

        return iCustomerMapper.toCustomerDTO(iCustomerRepository.save(customerEntity));
    }

    @Override
    public CustomerDTO loginCustomer(UserLoginRequest userLoginRequest) {
        var customer =  iCustomerRepository.findByCustomerEmail(userLoginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not found"));

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        boolean result = passwordEncoder.matches(userLoginRequest.getPassword(),customer.getCustomerPassword());

        if(!result)
            throw new RuntimeException("Password incorrect!");

        return  iCustomerMapper.toCustomerDTO(customer);
    }

    @Override
    public CustomerDTO updateCustomerProfile(String customerId, UserProfileRequest customerRequest) {

        CustomerEntity customer = iCustomerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        customer.setCustomerName(customerRequest.getUserName());
        customer.setCustomerAddress(customerRequest.getUserAddress());
        customer.setPhoneNumbers(customerRequest.getPhoneNumbers());
        customer.setCustomerAvatar(customerRequest.getUserAvatar());

        return iCustomerMapper.toCustomerDTO(iCustomerRepository.save(customer));
    }

    @Override
    public CustomerDTO getCustomer(String customerId) {
        CustomerEntity customer = iCustomerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return iCustomerMapper.toCustomerDTO(customer);
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return iCustomerMapper.toCustomerDTOList(iCustomerRepository.findAll());
    }

}
