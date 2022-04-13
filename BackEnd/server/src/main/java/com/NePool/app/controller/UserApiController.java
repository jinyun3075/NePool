package com.NePool.app.controller;

import com.NePool.app.util.dto.PageRequestDTO;
import com.NePool.app.util.dto.PageResultDTO;
import com.NePool.app.domain.user.dto.UserDTO;
import com.NePool.app.domain.user.entity.NePoolUser;
import com.NePool.app.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@Log4j2
@RequiredArgsConstructor
public class UserApiController {
    private final UserService service;
    @PostMapping("")
    public ResponseEntity<UserDTO> insertUser(@RequestBody UserDTO req) throws Exception {
        return new ResponseEntity<>(service.insertUser(req), HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> selectUser(@PathVariable String username) {
        return new ResponseEntity<>(service.selectUser(username), HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<PageResultDTO<UserDTO, NePoolUser>> selectUserList(@RequestParam(value = "page",required = false) Integer page, @RequestParam(value = "size", required = false) Integer size) {
        PageRequestDTO req = new PageRequestDTO();
        if(page!=null&&size!=null){
            req.setSize(size);
            req.setPage(page);
        }
        return new ResponseEntity<>(service.selectUserList(req),HttpStatus.OK);
    }
    @PutMapping("/update/to")
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO req) throws Exception{
        return new ResponseEntity<>(service.updateUser(req),HttpStatus.OK);
    }

    @DeleteMapping("/delete/{user_id}")
    public ResponseEntity<String> deleteUser(@PathVariable String user_id) throws Exception{
        return new ResponseEntity<>(service.deleteUser(user_id),HttpStatus.OK);
    }
}
