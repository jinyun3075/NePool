package com.nepool.app.controller;

import com.nepool.app.util.dto.PageResultDTO;
import com.nepool.app.domain.shareworkbook.dto.ShareWorkBookDTO;
import com.nepool.app.domain.shareworkbook.dto.ShareWorkBookResultDTO;
import com.nepool.app.domain.shareworkbook.entity.ShareWorkBook;
import com.nepool.app.service.ShareWorkBookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/share")
@Log4j2
@RequiredArgsConstructor
public class ShareWorkBookApiController {
    private final ShareWorkBookService service;

    @PostMapping("/register")
    public ResponseEntity<ShareWorkBookResultDTO> insertShareWorkBook(@RequestBody ShareWorkBookDTO dto) throws Exception {
        return new ResponseEntity<>(service.insertShareWorkBook(dto), HttpStatus.OK);
    }

    @GetMapping("/{user_id}")
    public ResponseEntity<PageResultDTO<ShareWorkBookResultDTO, ShareWorkBook>> selectShareWorkBookList(@PathVariable("user_id") String user_id, @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "size", required = false) Integer size) throws Exception {
        return new ResponseEntity<>(service.selectShareWorkBookList(user_id, page, size), HttpStatus.OK);
    }

    @DeleteMapping("")
    public ResponseEntity<String> updateShareWorkBook(@RequestBody ShareWorkBookDTO dto) throws Exception {
        return new ResponseEntity<>(service.deleteShareWorkBook(dto), HttpStatus.OK);
    }

    @GetMapping("/count/{work_book_id}")
    public ResponseEntity<Long> countShareWorkBook(@PathVariable("work_book_id") String work_book_id) throws Exception {
        return new ResponseEntity<>(service.selectShareWorkBookCount(work_book_id), HttpStatus.OK);
    }
}
