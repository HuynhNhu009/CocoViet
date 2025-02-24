package com.cocoviet.backend.controller;

import com.cocoviet.backend.models.dto.AuthenticationDTO;
import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.CustomerRequest;
import com.cocoviet.backend.models.request.RetailerRequest;
import com.cocoviet.backend.models.request.UserLoginRequest;
import com.cocoviet.backend.models.request.UserProfileRequest;
import com.cocoviet.backend.service.ICustomerService;
import com.cocoviet.backend.service.IRetailerService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;


@RestController
@RequestMapping("/api/retailers")
public class RetailerController {

    @Autowired
    IRetailerService iRetailerService;

    @PostMapping("/register")
    ResponseEntity<ResponseData> registerRetailer(@RequestBody @Valid RetailerRequest retailerRequest){
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ResponseData.builder()
                            .data(iRetailerService.registerRetailer(retailerRequest))
                            .msg("Register success with email: " + retailerRequest.getRetailerEmail())
                            .status("201") // HTTP 201 Created
                            .build());
        } catch (ResponseStatusException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ResponseData.builder()
                            .data(null)
                            .msg(ex.getReason()) // "Retailer already exists"
                            .status(String.valueOf(ex.getStatusCode().value())) // Đồng bộ với HTTP 400
                            .build());
        }
    }

    @PostMapping("/login")
    ResponseEntity<ResponseData> loginRetailer(@RequestBody @Valid UserLoginRequest retailerRequest, HttpServletResponse response) {
        AuthenticationDTO data = iRetailerService.loginRetailer(retailerRequest);
        Cookie jwtCookie = new Cookie("jwtRetailer", data.getToken());
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(false);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(24 * 60 * 60);
        response.addCookie(jwtCookie);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(data.getInfo())
                        .msg("Login success with email: " + retailerRequest.getEmail())
                        .status("OK")
                        .build());
    }

    @PatchMapping("/update-profile/{id}")
    ResponseEntity<ResponseData> updateRetailerProfile(@PathVariable String id,
                                                       @RequestBody @Valid UserProfileRequest retailerRequest) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(iRetailerService.updateRetailerProfile(id, retailerRequest))
                        .msg("Update profile success!")
                        .status("OK")
                        .build());
    }

    @GetMapping("/{retailerId}")
    ResponseEntity<ResponseData> getRetailer(@PathVariable String retailerId){

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(iRetailerService.getRetailer(retailerId))
                        .msg("Get Retailer success")
                        .status("OK")
                        .build());
    }

    @GetMapping("/get-all")
    ResponseEntity<ResponseData> getAllRetailer(){

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(iRetailerService.getAllRetailer())
                        .msg("Get all Retailers success")
                        .status("OK")
                        .build());
    }
}