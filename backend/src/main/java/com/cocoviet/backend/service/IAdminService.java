package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.AuthenticationDTO;
import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.AdminRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface IAdminService {

    AuthenticationDTO loginAdmin(AdminRequest adminRequest);
    ResponseEntity<?> introspectAdmin(HttpServletRequest httpServletRequest);
    void logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse);
}
