// package com.nepool.app.security;

// import lombok.RequiredArgsConstructor;
// import lombok.extern.log4j.Log4j2;
// import org.springframework.context.annotation.Bean;
// import org.springframework.security.config.Customizer;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import com.nepool.app.security.filter.ApiCheckFilter;
// import com.nepool.app.security.filter.ApiLoginFilter;
// import com.nepool.app.security.handler.ApiLoginFailHandler;
// import com.nepool.app.util.jwt.JWTUtil;

// import java.util.List;
// import java.util.Random;

// @EnableWebSecurity
// @RequiredArgsConstructor
// @Log4j2
// public class SecurityConfig2 {

//     @Bean
//     public JWTUtil jwtUtil(){
//         return new JWTUtil();
//     }
//     @Bean
//     public ApiCheckFilter apiCheckFilter() {
//         return new ApiCheckFilter(jwtUtil());
//     }
//     @Bean
//     public ApiLoginFilter apiLoginFilter() throws Exception {
//         ApiLoginFilter apiLoginFilter = new ApiLoginFilter("/user/login",jwtUtil());

//         apiLoginFilter.setAuthenticationFailureHandler(new ApiLoginFailHandler());
//         return apiLoginFilter;
//     }

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//             .cors(Customizer.withDefaults()) // <-- 이게 핵심            
//             .csrf(null)
//             .authorizeHttpRequests(auth -> auth
//                 .anyRequest().permitAll()
//             );
//     return http.build();
// }
// }