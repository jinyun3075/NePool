package com.NePool.app.controller;

import com.NePool.app.util.dto.PageResultDTO;
import com.NePool.app.domain.workbook.dto.WorkBookRequestDTO;
import com.NePool.app.domain.workbook.entity.WorkBook;
import com.NePool.app.service.WorkBookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/workbook")
@Log4j2
@RequiredArgsConstructor
public class WorkBookApiController {
    private final WorkBookService service;

    @PostMapping("/register")
    public ResponseEntity<WorkBookRequestDTO> insertWorkBook(@RequestBody WorkBookRequestDTO dto) throws Exception {
        return new ResponseEntity<>(service.insertWorkBook(dto), HttpStatus.OK);
    }

    @GetMapping("/{username}/{work_book_id}")
    public ResponseEntity<WorkBookRequestDTO> selectWorkBook(@PathVariable("username") String username, @PathVariable("work_book_id") String work_book_id, @RequestParam(value = "check", required = false) Boolean check) throws Exception {
        return new ResponseEntity<>(service.selectWorkBook(username, work_book_id, check), HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<PageResultDTO<WorkBookRequestDTO, WorkBook>> selectWorkBookMyList(@PathVariable String username, @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "size", required = false) Integer size) throws Exception {
        return new ResponseEntity<>(service.selectWorkBookMyList(username, page, size), HttpStatus.OK);
    }

    @GetMapping("/page")
    public ResponseEntity<PageResultDTO<WorkBookRequestDTO, WorkBook>> selectWorkBookPageList(@RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "size", required = false) Integer size, @RequestParam(value = "type", required = false) String type) throws Exception {
        return new ResponseEntity<>(service.selectWorkBookPageList(type, page, size), HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<WorkBookRequestDTO>> selectWorkBookList(@RequestParam(value = "type", required = false) String type) throws Exception {
        return new ResponseEntity<>(service.selectWorkBookList(type), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{username}/{work_book_id}")
    public ResponseEntity<String> deleteWorkBook(@PathVariable String username, @PathVariable String work_book_id) throws Exception {
        return new ResponseEntity<String>(service.deleteWorkBook(username, work_book_id), HttpStatus.OK);
    }

    @PutMapping("/share/{username}/{work_book_id}")
    public ResponseEntity<String> updateWorkBookShare(@PathVariable String username, @PathVariable String work_book_id) throws Exception {
        return new ResponseEntity<>(service.updateWorkBookShare(username, work_book_id), HttpStatus.OK);
    }

    @PutMapping("/update/{username}/{work_book_id}")
    public ResponseEntity<WorkBookRequestDTO> updateWorkBook(@PathVariable String username, @PathVariable String work_book_id, @RequestBody WorkBookRequestDTO req) throws Exception {
        return new ResponseEntity<>(service.updateWorkBook(username, work_book_id, req), HttpStatus.OK);
    }

    @GetMapping("/best4")
    public ResponseEntity<List<WorkBookRequestDTO>> selectWorkBookBest4() throws Exception {
        return new ResponseEntity<>(service.selectWorkBookBest4(), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<Long> selectWorkBookCount() {
        return new ResponseEntity<>(service.selectWorkBookCount(), HttpStatus.OK);
    }
}
