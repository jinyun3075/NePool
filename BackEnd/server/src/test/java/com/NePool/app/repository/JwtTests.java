package com.NePool.app.repository;

import com.NePool.app.security.util.JWTUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class JwtTests {

    private JWTUtil jwtUtil;
    @BeforeEach
    public void testBefore() {
        System.out.println("testBefor-------");
        jwtUtil = new JWTUtil();
    }

    @Test
    public void testEncode() throws Exception {
        String email = "123";
        String str = jwtUtil.generateToken(email);
        System.out.println(str);
    }

    @Test
    public void testValidate() throws Exception {
        String email = "123";
        String str = jwtUtil.generateToken(email);
        System.out.println(str);
        Thread.sleep(5000);

        String result = jwtUtil.validateAndExtract(str);
        System.out.println(result);
    }
}
