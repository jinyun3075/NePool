package com.nepool.app.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nepool.app.domain.user.dto.UserLoginDTO;
import com.nepool.app.domain.user.dto.UserLoginRequestDTO;
import com.nepool.app.security.dto.NePoolAuthDTO;
import com.nepool.app.util.jwt.JWTUtil;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

import org.springframework.security.authentication.*;
import org.springframework.security.core.*;
import org.springframework.security.web.authentication.*;

import java.io.IOException;
import java.util.*;


public class ApiLoginFilter extends UsernamePasswordAuthenticationFilter {
    
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    public ApiLoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        setFilterProcessesUrl("/user/login"); // 로그인 요청 URI
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException{
        try{
            Map<String, String> credentials = new ObjectMapper().readValue(request.getInputStream(), Map.class);
            String username = credentials.get("username");
            String password = credentials.get("password");

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);

            return authenticationManager.authenticate(authToken);
        } catch(IOException e){
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
     FilterChain chain, Authentication authResult) throws IOException{
        NePoolAuthDTO principal = ((NePoolAuthDTO)authResult.getPrincipal());
        try {
            List<String> roles = authResult.getAuthorities()
                        .stream().map(GrantedAuthority::getAuthority).toList();
            String token = jwtUtil.generateToken(principal.getUsername(), roles, 60);

            UserLoginDTO req = UserLoginDTO.builder()
                .id(principal.getId())
                .name(principal.getName())
                .email(principal.getEmail())
                .Token(token)
                .username(principal.getUsername())
                .build();
            
            response.setContentType("application/json;charset=utf-8");
            response.getWriter().write(new ObjectMapper().writeValueAsString(req));

        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}
