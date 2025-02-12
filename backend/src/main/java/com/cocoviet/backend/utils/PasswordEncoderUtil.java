package com.cocoviet.backend.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component
public class PasswordEncoderUtil {

    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}
