package com.NePool.app.controller;

import com.NePool.app.TestDto;
import com.NePool.app.dto.UserDTO;
import com.NePool.app.dto.UserLoginDTO;
import com.NePool.app.security.dto.NePoolAuthDTO;
import com.NePool.app.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@Log4j2
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor // 자동주입
public class UserCont {
    private final UserService service;
    @PostMapping("")
    public ResponseEntity<UserDTO> register(@RequestBody UserDTO req) throws Exception {
        return new ResponseEntity<>(service.register(req), HttpStatus.OK);
    }
//    @PostMapping("/login")
//    public ResponseEntity<NePoolAuthDTO> login(@AuthenticationPrincipal NePoolAuthDTO req) throws Exception {
//        log.info(req.getUsername());
//        return new ResponseEntity<>(req, HttpStatus.OK);
//    }
    @GetMapping({"/","list"})
    public String list(TestDto dto) {
        log.info(dto);
        return "dto";
    }
    @GetMapping("/{one}/{title}")
    public TestDto list2(TestDto dto) {
        log.info(dto);
        return dto;
    }
    @GetMapping("/a/{one}/{title}")
    public void list3(@PathVariable("one") Long one, @PathVariable("title") String title){
        log.info(one+title);
    }
    @PostMapping("/te")
    public TestDto pos2(@RequestBody TestDto dto) {
        log.info(dto);
        return dto;
    }
}
