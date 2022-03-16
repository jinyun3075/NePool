package com.NePool.app.controller;


import com.NePool.app.dto.CommentRequestDTO;
import com.NePool.app.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
@Log4j2
public class CommentCont {
    private final CommentService service;

    @PostMapping("/{username}/{work_book_id}")
    public ResponseEntity<CommentRequestDTO> register(@PathVariable String username, @PathVariable String work_book_id, @RequestBody CommentRequestDTO dto) throws Exception {
        return new ResponseEntity<>(service.register(username, work_book_id, dto), HttpStatus.OK);
    }
}
