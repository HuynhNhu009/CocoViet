package com.cocoviet.backend.controller;


import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.service.IAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    IAdminService iAdminService;

    @GetMapping("/all-customers")
    ResponseEntity<ResponseData> getAllCustomers() {

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(iAdminService.getAllCustomers())
                        .msg("Get all customers successfully")
                        .status("OK")
                        .build());
    }

    @GetMapping("/all-retailer")
    ResponseEntity<ResponseData> getAllRetailers() {

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(iAdminService.getAllRetailers())
                        .msg("Get all retailers successfully")
                        .status("OK")
                        .build());
    }

    @GetMapping("/all-products")
    ResponseEntity<ResponseData> getAllProducts() {

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(iAdminService.getAllProducts())
                        .msg("Get all products successfully")
                        .status("OK")
                        .build());
    }
}