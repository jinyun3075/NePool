package com.nepool.app.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nepool.app.domain.user.dto.UserDTO;
import com.nepool.app.domain.user.entity.NePoolUser;
import com.nepool.app.service.UserService;
import com.nepool.app.util.dto.PageResultDTO;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
@Log4j2
@RequiredArgsConstructor
public class UserApiController {
    private final UserService service;

    @PostMapping("")
    public ResponseEntity<UserDTO> insertUser(@RequestBody UserDTO req, HttpServletRequest request) throws Exception {
        log.info("요청 Origin: {}", request.getHeader("Origin"));
        return new ResponseEntity<>(service.insertUser(req), HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> selectUser(@PathVariable String username) throws Exception {
        return new ResponseEntity<>(service.selectUser(username), HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<PageResultDTO<UserDTO, NePoolUser>> selectUserList(@RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "size", required = false) Integer size) {
        return new ResponseEntity<>(service.selectUserList(page, size), HttpStatus.OK);
    }

    @PutMapping("/update/to")
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO req) throws Exception {
        return new ResponseEntity<>(service.updateUser(req), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{user_id}")
    public ResponseEntity<String> deleteUser(@PathVariable String user_id) throws Exception {
        return new ResponseEntity<>(service.deleteUser(user_id), HttpStatus.OK);
    }
}
