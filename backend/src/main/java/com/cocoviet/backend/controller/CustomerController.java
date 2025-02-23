package com.cocoviet.backend.controller;

import com.cocoviet.backend.models.dto.AuthenticationDTO;
import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.CustomerRequest;
import com.cocoviet.backend.models.request.UserLoginRequest;
import com.cocoviet.backend.models.request.UserProfileRequest;
import com.cocoviet.backend.service.ICustomerService;
import com.cocoviet.backend.utils.JwtToken;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import com.nimbusds.jwt.JWTClaimsSet;


import java.io.IOException;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    ICustomerService iCustomerService;
    @Autowired
    private JwtToken jwtToken;

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
//    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    ResponseEntity<ResponseData> loginCustomer(@RequestBody @Valid UserLoginRequest customerRequest, HttpServletResponse response) {
        AuthenticationDTO data = iCustomerService.loginCustomer(customerRequest);
        Cookie jwtCookie = new Cookie("jwt", data.getToken());
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(false);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(24 * 60 * 60);
        response.addCookie(jwtCookie);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(data.getInfo())
                        .msg("Login success with email: " + customerRequest.getEmail())
                        .status("OK")
                        .build());
    }


    @GetMapping("/check")
    public ResponseEntity<?> checkAuth(HttpServletRequest request) {
        String jwt = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }

        if (jwt == null || jwt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseData.builder()
                            .data(null)
                            .msg("User not authenticated: No JWT found in cookie")
                            .status("UNAUTHORIZED")
                            .build());
        }

        try {
            JWTClaimsSet claims = jwtToken.validateToken(jwt);
            String customerEmail = claims.getSubject(); // Lấy sub (email hoặc ID) từ JWT
            Object customerInfo = iCustomerService.getCustomerByEmail(customerEmail); // Lấy thông tin từ service
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseData.builder()
                            .data(customerInfo) // Trả về thông tin người dùng đầy đủ
                            .msg("Check success")
                            .status("OK")
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseData.builder()
                            .data(null)
                            .msg("User not authenticated: Invalid or expired token")
                            .status("UNAUTHORIZED")
                            .build());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        String jwt = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }

        Cookie jwtCookie = new Cookie("jwt", null);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(0);
        response.addCookie(jwtCookie);

        if (jwt == null || jwt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseData.builder()
                            .data(null)
                            .msg("No active session to logout")
                            .status("NO_SESSION")
                            .build());
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(null)
                        .msg("Logout success")
                        .status("OK")
                        .build());
    }


    @PatchMapping("/update-profile/{id}")
    ResponseEntity<ResponseData> updateCustomerProfile(@PathVariable String id,
                                                       @RequestBody @Valid UserProfileRequest customerRequest) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(iCustomerService.updateCustomerProfile(id, customerRequest))
                        .msg("Update profile success!")
                        .status("OK")
                        .build());
    }

    @GetMapping("/{id}")
    ResponseEntity<ResponseData> getCustomer(@PathVariable String id){

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(iCustomerService.getCustomer(id))
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