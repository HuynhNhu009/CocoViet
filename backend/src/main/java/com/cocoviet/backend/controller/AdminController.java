package com.cocoviet.backend.controller;


import com.cocoviet.backend.models.dto.AuthenticationDTO;
import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.AdminRequest;
import com.cocoviet.backend.service.IAdminService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    IAdminService iAdminService;

    @PostMapping("/")
    ResponseEntity<ResponseData> login(@RequestBody AdminRequest adminRequest, HttpServletResponse httpServletResponse) {

        AuthenticationDTO data = iAdminService.loginAdmin(adminRequest);
        Cookie jwtCookie = new Cookie("jwt", data.getToken());
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(false);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(24 * 60 * 60);
        httpServletResponse.addCookie(jwtCookie);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(data.getInfo())
                        .msg("Login success")
                        .status("OK")
                        .build());
    }

    @GetMapping("/")
    ResponseEntity<?> introspectAdmin( HttpServletRequest httpServletRequest) {

        return  iAdminService.introspectAdmin(httpServletRequest);
    }






}