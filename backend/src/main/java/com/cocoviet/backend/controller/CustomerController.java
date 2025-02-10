package com.cocoviet.backend.controller;

import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.CustomerRequest;
import com.cocoviet.backend.service.ICustomerService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    ICustomerService customerService;

    @PostMapping("/registerCustomer")
    ResponseEntity<ResponseData> registerCustomer(@RequestBody @Valid CustomerRequest customerRequest) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseData.builder()
                        .data(customerService.registerCustomer(customerRequest))
                        .msg("User registered successfully!" )
                        .build());
    }
}
