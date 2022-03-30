package com.NePool.app.controller;

import com.NePool.app.dto.ShareWorkBookDTO;
import com.NePool.app.service.ShareWorkBookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/share")
@Log4j2
@RequiredArgsConstructor
public class ShareWorkBookCont {
    private final ShareWorkBookService service;

    @PostMapping("/register")
    public ResponseEntity<ShareWorkBookDTO> register(@RequestBody ShareWorkBookDTO dto) throws Exception{
        return new ResponseEntity<>(service.register(dto), HttpStatus.OK);
    }
}
