package com.NePool.app.security.filter;

import com.NePool.app.security.util.JWTUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import lombok.extern.log4j.Log4j2;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@Log4j2
public class ApiCheckFilter extends OncePerRequestFilter {

    private AntPathMatcher antPathMatcher;
    private JWTUtil jwtUtil;

    public ApiCheckFilter(JWTUtil jwtUtil) {
        this.antPathMatcher = new AntPathMatcher();
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("APICheckFilter.......................");
        List<String> checkUrl = checkUrl();
        for (String pattern: checkUrl) {
            if(antPathMatcher.match(pattern,request.getRequestURI())){
                filterChain.doFilter(request, response);
                return;
            }
        }
        boolean checkHeader = checkAuthHeader(request);
        if (checkHeader) {
            filterChain.doFilter(request, response);
            return;
        } else {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json;charset=utf-8");
            String message = "FAIL CHECK API TOKEN";
            ArrayList<String> data = new ArrayList<>();
            data.add("code:403");
            data.add(message);
            ObjectMapper mapper = new ObjectMapper();
            JSONPObject json = new JSONPObject("Error", data);
            PrintWriter out = response.getWriter();
            out.print(mapper.writeValueAsString(json));
            return;
        }

    }

    private boolean checkAuthHeader(HttpServletRequest request) {
        boolean checkResult = false;
        String authHeader = request.getHeader("Authorization");
        if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
            try {
                String email = jwtUtil.validateAndExtract(authHeader.substring(7));
                checkResult = email.length()>0;
            } catch(Exception e) {
                e.printStackTrace();
            }
        }
        return checkResult;
    }

    private List<String> checkUrl() {
        List<String> list = new ArrayList<>();
        list.add("/search/*");
        list.add("/workbook/best4");
        list.add("/user");
        list.add("/user/*");
        list.add("/workbook");
        list.add("/workbook/page");
        list.add("/workbook/all");
        list.add("/workbook/*/*");
        list.add("/comment/like/*");
        list.add("/work/*/*");
        return list;
    }
}
