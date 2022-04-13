package com.NePool.app.domain.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

@Log4j2
public class ApiLoginFailHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        log.info("login fail handler ..........");

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json;charset=utf-8");
        ArrayList<String> data = new ArrayList<>();
        data.add("code:401");
        data.add("아이디 혹은 비밀번호가 일치하지 않습니다.");
        ObjectMapper mapper = new ObjectMapper();
        JSONPObject json = new JSONPObject("Error",data);
        PrintWriter out = response.getWriter();
        out.print(mapper.writeValueAsString(json));
    }
}
