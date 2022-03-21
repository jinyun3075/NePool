package com.NePool.app.controller;


import com.NePool.app.dto.CommentRequestDTO;
import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.entity.Comments;
import com.NePool.app.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
@Log4j2
public class CommentCont {
    private final CommentService service;

    @PostMapping("/{user_id}/{work_book_id}")
    public ResponseEntity<CommentRequestDTO> register(@PathVariable String user_id, @PathVariable String work_book_id, @RequestBody CommentRequestDTO dto) throws Exception {
        return new ResponseEntity<>(service.register(user_id, work_book_id, dto), HttpStatus.OK);
    }

    @GetMapping("/{work_book_id}")
    public ResponseEntity<PageResultDTO<CommentRequestDTO, Comments>> getList(@PathVariable String work_book_id,@RequestParam(value = "page",required = false) Integer page, @RequestParam(value = "size", required = false) Integer size) throws Exception {
        PageRequestDTO req = new PageRequestDTO();
        if(page!=null&&size!=null){
            req.setSize(size);
            req.setPage(page);
        }
        return new ResponseEntity<>(service.getList(work_book_id,req),HttpStatus.OK);
    }
}
