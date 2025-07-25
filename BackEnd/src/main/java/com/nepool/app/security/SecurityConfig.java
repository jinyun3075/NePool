package com.nepool.app.security;

import java.util.*;

import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.*;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import com.nepool.app.security.filter.*;
import com.nepool.app.security.handler.ApiLoginFailHandler;
import com.nepool.app.util.jwt.JWTUtil;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // @Bean
    // public JWTUtil jwtUtil(){
    //     return new JWTUtil();
    // }

    // AuthenticationManager Bean 등록 (Spring Security 6 이상)
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // ApiLoginFilter Bean (로그인 요청 처리)
    // @Bean
    // public ApiLoginFilter apiLoginFilter(AuthenticationManager authenticationManager) throws Exception {
    //     ApiLoginFilter filter = new ApiLoginFilter("/user/login", jwtUtil());
    //     filter.setAuthenticationManager(authenticationManager);
    //     filter.setAuthenticationFailureHandler(new ApiLoginFailHandler());
    //     return filter;
    // }

    // @Bean
    // public ApiCheckFilter apiCheckFilter() {
    //     return new ApiCheckFilter(jwtUtil());
    // }

    // SecurityFilterChain 등록
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authManager, JWTUtil jwtUtil) throws Exception {
        ApiLoginFilter loginFilter = new ApiLoginFilter(authManager, jwtUtil);
        loginFilter.setAuthenticationFailureHandler(new ApiLoginFailHandler());

        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> 
                    auth
                      .requestMatchers(checkUrl()).permitAll()
                      .anyRequest().authenticated()
            );

        return http.build();
    }

    private String[] checkUrl() {
        String[] arr = {
            "/search/*"
            ,"/workbook/best4"
            ,"/user"
            ,"/user/*"
            ,"/workbook"
            ,"/workbook/page"
            ,"/workbook/all"
            ,"/workbook/*/*"
            ,"/comment/like/*"
            ,"/work/*/*"
        };        
        return arr;
    }
}
