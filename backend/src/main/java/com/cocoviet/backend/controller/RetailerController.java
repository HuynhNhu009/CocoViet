package com.cocoviet.backend.controller;

import com.cocoviet.backend.models.dto.AuthenticationDTO;
import com.cocoviet.backend.models.dto.UnitDTO;
import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.CustomerRequest;
import com.cocoviet.backend.models.request.RetailerRequest;
import com.cocoviet.backend.models.request.UserLoginRequest;
import com.cocoviet.backend.models.request.UserProfileRequest;
import com.cocoviet.backend.service.ICustomerService;
import com.cocoviet.backend.service.IRetailerService;
import com.cocoviet.backend.utils.JwtToken;
import com.nimbusds.jwt.JWTClaimsSet;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Set;


@RestController
@RequestMapping("/api/retailers")
public class RetailerController {

    @Autowired
    IRetailerService iRetailerService;

    @Autowired
    private JwtToken jwtToken;

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

    @GetMapping("/check")
    public ResponseEntity<?> checkAuth(HttpServletRequest request) {
        String jwt = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwtRetailer".equals(cookie.getName())) {
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
            String retailerEmail = claims.getSubject(); // Lấy sub (email hoặc ID) từ JWT
            Object retailerInfo = iRetailerService.getRetailerEmail(retailerEmail); // Lấy thông tin từ service
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseData.builder()
                            .data(retailerInfo) // Trả về thông tin người dùng đầy đủ
                            .msg("Check success")
                            .status("OK")
                            .build());
        } catch (Exception e) {
            String errorMsg = e.getMessage();
            if ("Token is invalid or expired".equals(errorMsg)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED) // 401
                        .body(ResponseData.builder()
                                .data(null)
                                .msg("Token is invalid or expired")
                                .status("401")
                                .build());
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST) // 400 cho lỗi khác
                        .body(ResponseData.builder()
                                .data(jwt)
                                .msg("Invalid token")
                                .status("400")
                                .build());
            }
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        String jwt = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwtRetailer".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }

        Cookie jwtCookie = new Cookie("jwtRetailer", null);
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

    @GetMapping("/{retailerId}/units")
    public ResponseEntity<ResponseData> getAllUnitsByRetailerId(@PathVariable String retailerId) {
        Set<UnitDTO> units = iRetailerService.getUnitsByRetailerId(retailerId);
        return ResponseEntity.ok()
                .body(ResponseData.builder()
                        .data(units)
                        .msg("Units for retailer '" + retailerId + "' retrieved successfully")
                        .status("SUCCESS")
                        .build());
    }
}