package com.cocoviet.backend.controller;

import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.CustomerRequest;
import com.cocoviet.backend.models.request.UserLoginRequest;
import com.cocoviet.backend.service.ICustomerService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    ICustomerService iCustomerService;

    @PostMapping("/register")
    ResponseEntity<ResponseData> registerCustomer(@RequestBody @Valid CustomerRequest customerRequest) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseData.builder()
                        .data(iCustomerService.registerCustomer(customerRequest))
                        .msg("Register success with email: " + customerRequest.getCustomerEmail() )
                        .status("OK")
                        .build());
    }

    @PostMapping("/login")
    ResponseEntity<ResponseData> loginCustomer(@RequestBody @Valid UserLoginRequest customerRequest) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(iCustomerService.loginCustomer(customerRequest))
                        .msg("Login success with email: " + customerRequest.getEmail())
                        .status("OK")
                        .build());
    }

    @PatchMapping("/update-profile")
    ResponseEntity<ResponseData> updateCustomerProfile(@PathVariable String email,
                                                       @RequestBody @Valid CustomerRequest customerRequest) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(iCustomerService.updateCustomerProfile(email, customerRequest))
                        .msg("Update profile success!")
                        .status("OK")
                        .build());
    }

    @GetMapping("/{id}")
    ResponseEntity<ResponseData> getCustomer(@PathVariable String email){

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(iCustomerService.getCustomer(email))
                        .msg("Get customer success")
                        .status("OK")
                        .build());
    }

    @GetMapping("/get-all")
    ResponseEntity<ResponseData> getAllCustomer(){

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(iCustomerService.getAllCustomers())
                        .msg("Get customer success")
                        .status("OK")
                        .build());
    }
}