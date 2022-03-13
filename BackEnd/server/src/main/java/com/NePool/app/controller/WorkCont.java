package com.NePool.app.controller;

import com.NePool.app.dto.WorkDTO;

import com.NePool.app.service.WorkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/work")
@Log4j2
@RequiredArgsConstructor
public class WorkCont {
    private final WorkService service;

    @PostMapping("/{username}/{work_book_id}")
    public ResponseEntity<WorkDTO> register (@RequestBody WorkDTO dto, @PathVariable String username, @PathVariable String work_book_id) throws Exception {
        return new ResponseEntity<>(service.register(dto,username,work_book_id), HttpStatus.OK);
    }
}
