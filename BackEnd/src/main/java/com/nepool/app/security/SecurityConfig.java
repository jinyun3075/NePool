package com.nepool.app.security;

import java.util.*;

import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.*;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.nepool.app.security.filter.*;
import com.nepool.app.security.handler.ApiLoginFailHandler;
import com.nepool.app.util.jwt.JWTUtil;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public JWTUtil jwtUtil(){
        return new JWTUtil();
    }

    // AuthenticationManager Bean 등록 (Spring Security 6 이상)
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // SecurityFilterChain 등록
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authManager) throws Exception {
        ApiLoginFilter loginFilter = new ApiLoginFilter(authManager, jwtUtil());
        ApiCheckFilter checkFilter = new ApiCheckFilter(jwtUtil());
        loginFilter.setAuthenticationFailureHandler(new ApiLoginFailHandler());

        http
            // .cors(cors -> cors.configurationSource(request -> {
            //     CorsConfiguration config = new CorsConfiguration();
            //     config.setAllowedOrigins(List.of("*"));
            //     config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
            //     config.setAllowedHeaders(List.of("*"));
            //     config.setAllowCredentials(true);
            //     return config;
            // }))
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> 
                    auth
                      .requestMatchers(checkUrl()).permitAll()
                      .anyRequest().authenticated()
            )
            .addFilterBefore(checkFilter, UsernamePasswordAuthenticationFilter.class)
            .addFilterAt(loginFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    private String[] checkUrl() {
        String[] arr = {
            "/api/search/*"
            ,"/api/workbook/best4"
            ,"/api/user"
            ,"/api/user/*"
            ,"/api/user/login"
            ,"/api/workbook"
            ,"/api/workbook/page"
            ,"/api/workbook/all"
            ,"/api/workbook/*/*"
            ,"/api/comment/like/*"
            ,"/api/work/*/*"
            ,"/api/announcement/show/*"
            ,"/api/announcement"
            ,"/api/upload"
            ,"/api/image/**"
        };        
        return arr;
    }
}
