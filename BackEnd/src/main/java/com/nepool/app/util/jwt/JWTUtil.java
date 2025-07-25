package com.nepool.app.util.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JWTUtil {
    @Value("${jwt_key}")
    private String jwtSecret;
    private final Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

    // 토큰 생성
    public String generateToken(String username, List<String> roles, int minutes){
        return Jwts.builder()
                .setSubject(username)
                .claim(username, roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + minutes *60 *1000))
                .signWith(key) // 서명 알고리즘 및 키 지정
                .compact();  // 실제 JWT 문자열 반환
    }

    // 토큰 검증
    public Claims validateToken(String token) throws JwtException{
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
