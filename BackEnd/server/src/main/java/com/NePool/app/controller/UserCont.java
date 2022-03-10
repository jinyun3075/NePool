package com.NePool.app.controller;

import com.NePool.app.TestDto;
import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.dto.UserDTO;
import com.NePool.app.dto.UserLoginDTO;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.security.dto.NePoolAuthDTO;
import com.NePool.app.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.jaxb.SpringDataJaxb;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@Log4j2
@RequiredArgsConstructor // 자동주입
public class UserCont {
    private final UserService service;
    @PostMapping("")
    public ResponseEntity<UserDTO> register(@RequestBody UserDTO req) throws Exception {
        return new ResponseEntity<>(service.register(req), HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> showUser(@PathVariable String username) {
        return new ResponseEntity<>(service.getUser(username), HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<PageResultDTO<UserDTO, NePoolUser>> allUser(@RequestParam(value = "page",required = false) Integer page, @RequestParam(value = "size", required = false) Integer size) {
        PageRequestDTO req = new PageRequestDTO();
        if(page!=null&&size!=null){
            req.setSize(size);
            req.setPage(page);
        }
        return new ResponseEntity<>(service.getList(req),HttpStatus.OK);
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
