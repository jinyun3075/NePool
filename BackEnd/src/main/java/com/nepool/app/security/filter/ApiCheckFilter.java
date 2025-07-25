package com.nepool.app.security.filter;

import com.nepool.app.util.jwt.JWTUtil;
import io.jsonwebtoken.Claims;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


public class ApiCheckFilter extends GenericFilter {

    private JWTUtil jwtUtil;

    public ApiCheckFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
    throws IOException, ServletException{
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String authHeader = httpRequest.getHeader("Authorization");

        if(authHeader != null && authHeader.startsWith("Bearer ")){
            String token = authHeader.substring(7);
            try{
                Claims claims = jwtUtil.validateToken(token);
                String username = claims.getSubject();
                List<String> roles = (List<String>) claims.get("roles");
                List<SimpleGrantedAuthority> authorities = roles.stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
                
                Authentication auth = new UsernamePasswordAuthenticationToken(username, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (Exception e) {
                HttpServletResponse httpResponse = (HttpServletResponse) response;
                httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }
        chain.doFilter(request, response);
    }

    //     @Override
    //     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    //         List<String> checkUrl = checkUrl();
    //         log.info(request.getRequestURI());
    //         for (String pattern: checkUrl) {
    //             if(antPathMatcher.match(pattern,request.getRequestURI())){
    //                 filterChain.doFilter(request, response);
    //                 return;
    //             }
    //         }
    //         boolean checkHeader = checkAuthHeader(request);
    //         if (checkHeader) {
    //             filterChain.doFilter(request, response);
    //             return;
    //         } else {
    //             response.setStatus(HttpServletResponse.SC_FORBIDDEN);
    //             response.setContentType("application/json;charset=utf-8");
    //             String message = "FAIL CHECK API TOKEN";
    //             ArrayList<String> data = new ArrayList<>();
    //             data.add("code:403");
    //             data.add(message);
    //             ObjectMapper mapper = new ObjectMapper();
    //             JSONPObject json = new JSONPObject("Error", data);
    //             PrintWriter out = response.getWriter();
    //             out.print(mapper.writeValueAsString(json));
    //             return;
    //         }

    // private boolean checkAuthHeader(HttpServletRequest request) {
    //     boolean checkResult = false;
    //     String authHeader = request.getHeader("Authorization");
    //     if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
    //         try {
    //             // String email = jwtUtil.validateAndExtract(authHeader.substring(7));
    //             // checkResult = email.length()>0;
    //         } catch(Exception e) {
    //             e.printStackTrace();
    //         }
    //     }
    //     return checkResult;
    // }

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
