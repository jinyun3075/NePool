package com.NePool.app.domain.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://www.nepool.co.kr","http://front:3000","http://localhost:3000")
                .allowedMethods("*") // 기타 설정
                .allowedHeaders("*");
    }
}

