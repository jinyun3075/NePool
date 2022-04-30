package com.NePool.app.util.module;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Random;


public class BCryptModule {

    private Random random(){
        Random random = new Random();
        random.setSeed(System.currentTimeMillis());
        return random;
    }
    private PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public String makeId() {
        return passwordEncoder().encode(random().nextInt(600) + "").replace("/", "");
    }

    public String encodePw(String password) {
        return passwordEncoder().encode(password);
    }

    public void matchesPw(String object, String comObject) throws Exception {
        if(!passwordEncoder().matches(object, comObject)) {
            throw new Exception("Password 가 틀립니다.");
        }
    }
}
