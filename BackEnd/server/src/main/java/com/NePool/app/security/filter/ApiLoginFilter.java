package com.NePool.app.security.filter;

import com.NePool.app.dto.UserLoginDTO;
import com.NePool.app.dto.UserLoginRequestDTO;
import com.NePool.app.security.dto.NePoolAuthDTO;
import com.NePool.app.security.util.JWTUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Log4j2
public class ApiLoginFilter extends AbstractAuthenticationProcessingFilter {
    private JWTUtil jwtUtil;

    @Autowired
    private ApiCheckFilter apiCheckFilter;

    public ApiLoginFilter(String defaultFilterProcessesUrl, JWTUtil jwtUtil) {
        super(defaultFilterProcessesUrl);
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        log.info("-------------------------ApiLoginFilter------------------");
        log.info("attemptAuthentication");
        UserLoginRequestDTO body = new ObjectMapper().readValue(request.getInputStream(),UserLoginRequestDTO.class);
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(body.getUsername(),body.getPassword());
        return getAuthenticationManager().authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        log.info("-----------------ApiLoginFilter-----------------");
        log.info("successfulAuthentication: " + authResult);
        log.info(authResult.getPrincipal());
        log.info(((NePoolAuthDTO)authResult.getPrincipal()));

        NePoolAuthDTO principal = ((NePoolAuthDTO)authResult.getPrincipal());

        try {
            UserLoginDTO req = new UserLoginDTO();
            req.setName(principal.getName());
            req.setEmail(principal.getEmail());
            req.setToken( jwtUtil.generateToken("123"));
            req.setUsername(principal.getUsername());
            response.setContentType("application/json");
            response.getWriter().write(new ObjectMapper().writeValueAsString(req));

        } catch(Exception e) {
            e.printStackTrace();
        }
    }

}
