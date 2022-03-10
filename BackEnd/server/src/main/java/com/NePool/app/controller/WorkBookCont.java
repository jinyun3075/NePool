package com.NePool.app.controller;

import com.NePool.app.dto.WorkBookRequestDTO;
import com.NePool.app.service.WorkBookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/workbook")
@Log4j2
@RequiredArgsConstructor
public class WorkBookCont {
    private final WorkBookService service;
    @PostMapping("")
    public ResponseEntity<WorkBookRequestDTO> register(@RequestBody WorkBookRequestDTO dto){
        return new ResponseEntity<>(service.register(dto), HttpStatus.OK);
    }
}
