package com.cocoviet.backend.configuration;

import com.cocoviet.backend.models.entity.AdminEntity;
import com.cocoviet.backend.repository.IAdminRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {
    IAdminRepository adminRepository;

    @NonFinal
    @Value("${ADMIN_NAME}")
    protected String ADMIN_NAME;

    @NonFinal
    @Value("${ADMIN_PASSWORD}")
    protected String ADMIN_PASSWORD;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000", "http://localhost:3001","http://localhost:3002")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                        .allowCredentials(true);
            }
        };
    }

    @Bean
    ApplicationRunner applicationRunner() {
        return args -> {
            if (!adminRepository.existsByAdminName(ADMIN_NAME)) {
                PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
                AdminEntity adminEntity = AdminEntity.builder()
                        .adminName(ADMIN_NAME)
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .build();
                adminRepository.save(adminEntity);
            }
        };
    }
}