package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.mapper.IAdminMapper;
import com.cocoviet.backend.mapper.ICustomerMapper;
import com.cocoviet.backend.mapper.IProductMapper;
import com.cocoviet.backend.mapper.IRetailerMapper;
import com.cocoviet.backend.models.dto.*;
import com.cocoviet.backend.models.entity.*;
import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.AdminRequest;
import com.cocoviet.backend.models.request.UserLoginRequest;
import com.cocoviet.backend.repository.*;
import com.cocoviet.backend.service.IAdminService;
import com.cocoviet.backend.utils.AdminAuthen;
import com.cocoviet.backend.utils.JwtToken;
import com.cocoviet.backend.utils.PasswordEncoderUtil;
import com.nimbusds.jwt.JWTClaimsSet;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdminServiceImpl implements IAdminService {

    @Autowired
    IAdminRepository adminRepository;

    @Autowired
    PasswordEncoderUtil passwordEncoderUtil;

    @Autowired
    IAdminMapper adminMapper;

    @Autowired
    AdminAuthen adminAuthen;

    @Override
    public AuthenticationDTO loginAdmin(AdminRequest adminRequest) {
        AdminEntity adminEntity = adminRepository.findByAdminName(adminRequest.getAdminName());
        if(adminEntity == null) {
            throw new RuntimeException("Admin not found!");
        }
        boolean checkPassword = passwordEncoderUtil.passwordEncoder().matches(adminRequest.getPassword(), adminEntity.getPassword());
        if(!checkPassword)
            throw new RuntimeException("Password incorrect!");

        String token = (adminAuthen.generateToken(adminEntity.getAdminName()));

        AuthenticationDTO authenticationDTO = new AuthenticationDTO();
        authenticationDTO.setToken(token);
        authenticationDTO.setInfo(adminMapper.toAdminDTO(adminEntity));
        return authenticationDTO ;
    }

    @Override
    public ResponseEntity<?> introspectAdmin(HttpServletRequest httpServletRequest) {
        String jwt = null;
        Cookie[] cookies = httpServletRequest.getCookies();
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
            JWTClaimsSet claims = adminAuthen.introspectToken(jwt);
            String adminName = claims.getSubject();
            Object customerInfo = adminRepository.findByAdminName(adminName);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseData.builder()
                            .data(customerInfo)
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
                                .data(null)
                                .msg("Invalid token")
                                .status("400")
                                .build());
            }
        }
    }

    @Override
    public  ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
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

}
