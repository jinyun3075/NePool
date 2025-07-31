package com.nepool.app.security;

import org.springframework.context.annotation.Configuration;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    //  @Override
    // public void addCorsMappings(CorsRegistry registry) {
    //     registry.addMapping("/**")   // 모든 경로에 대해
    //             .allowedOrigins("http://localhost:3000")  // 허용할 출처
    //             .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드
    //             .allowCredentials(true)  // 인증 정보 허용 (쿠키, 헤더)
    //             .allowedHeaders("*");  // 허용할 헤더
    // }
}

