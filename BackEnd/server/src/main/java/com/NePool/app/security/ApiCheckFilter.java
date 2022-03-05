package com.NePool.app.security;

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

@Log4j2
public class ApiCheckFilter extends OncePerRequestFilter {

    private AntPathMatcher antPathMatcher;
    private String pattern;

    public ApiCheckFilter(String pattern) {
        this.antPathMatcher = new AntPathMatcher();
        this.pattern = pattern;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("REQUESTURI:" + request.getRequestURI());
        log.info(antPathMatcher.match(pattern, request.getRequestURI()));

        if(antPathMatcher.match(pattern,request.getRequestURI())){

            log.info("APICheckFilter.......................");
            log.info("APICheckFilter.......................");
            log.info("APICheckFilter.......................");
            boolean checkHeader = checkAuthHeader(request);
            if(checkHeader) {
                filterChain.doFilter(request, response);
                return;
            }else {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.setContentType("application/json;charset=utf-8");
                String message ="FAIL CHECK API TOKEN";
                ArrayList<String> data = new ArrayList<>();
                data.add("code:403");
                data.add(message);
                ObjectMapper mapper = new ObjectMapper();
                JSONPObject json = new JSONPObject("Error",data);
                PrintWriter out = response.getWriter();
                out.print(mapper.writeValueAsString(json));
                return;
            }
        }
        filterChain.doFilter(request, response);
    }

    private boolean checkAuthHeader(HttpServletRequest request) {
        boolean checkResult = false;
        String authHeader = request.getHeader("Authorization");
        if(StringUtils.hasText(authHeader)) {
            log.info("Authorization exist: " + authHeader);
            if(authHeader.equals("123")) {
                checkResult= true;
            }
        }
        return checkResult;
    }
}
