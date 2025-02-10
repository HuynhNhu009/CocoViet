package com.cocoviet.backend.controller;


import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.ProductRequest;
import com.cocoviet.backend.service.ICoconutProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/products")
public class CoconutProductController {

    @Autowired
    ICoconutProductService coconutProductService;

    @PostMapping("/add")
    ResponseEntity<ResponseData> addProduct(@RequestBody @Valid ProductRequest coconutProductRequest){

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseData.builder()
                        .data(coconutProductService.addProduct(coconutProductRequest))
                        .msg("Add product:  successfully")
                        .status("OK")
                        .build());
    }
}
