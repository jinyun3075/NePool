package com.NePool.app.controller;

import com.NePool.app.dto.*;

import com.NePool.app.service.WorkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/{username}/{work_book_id}/{work_id}")
    public ResponseEntity<WorkDTO> getWork (@PathVariable String username, @PathVariable String work_book_id, @PathVariable String work_id) throws Exception {
        return new ResponseEntity<>(service.getWork(username,work_book_id,work_id), HttpStatus.OK);
    }

    @GetMapping("/{username}/{work_book_id}")
    public ResponseEntity<List<WorkDTO>> getList (@PathVariable String username, @PathVariable String work_book_id) throws Exception {
        return new ResponseEntity<>(service.getList(username,work_book_id), HttpStatus.OK);
    }

    @PostMapping("/{work_book_id}")
    public ResponseEntity<WorkResultRealResponseDTO> checkResult(@RequestBody List<WorkResultRequestDTO> result, @PathVariable String work_book_id) throws Exception{
        return new ResponseEntity<>(service.checkResult(result,work_book_id),HttpStatus.OK);
    }

    @DeleteMapping("/{username}/{work_book_id}/{work_id}")
    public String delete(@PathVariable String username, @PathVariable String work_book_id, @PathVariable String work_id) throws Exception{
        service.delete(username,work_book_id,work_id);
        return "삭제완료";
    }
    @PutMapping("/{username}/{work_book_id}/{work_id}")
    public ResponseEntity<WorkDTO> update(@PathVariable String username, @PathVariable String work_book_id, @PathVariable String work_id, @RequestBody WorkDTO dto) throws Exception{
        return new ResponseEntity<>(service.update(username,work_book_id,work_id,dto),HttpStatus.OK);
    }

}
