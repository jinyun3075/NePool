package com.NePool.app.controller;

import com.NePool.app.domain.work.dto.WorkDTO;
import com.NePool.app.domain.work.dto.WorkResultRealResponseDTO;
import com.NePool.app.domain.work.dto.WorkResultRequestDTO;

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
public class WorkApiController {
    private final WorkService service;

    @PostMapping("/{username}/{work_book_id}")
    public ResponseEntity<WorkDTO> insertWork (@RequestBody WorkDTO dto, @PathVariable String username, @PathVariable String work_book_id) throws Exception {
        return new ResponseEntity<>(service.insertWork(dto,username,work_book_id), HttpStatus.OK);
    }

    @GetMapping("/{username}/{work_book_id}/{work_id}")
    public ResponseEntity<WorkDTO> selectWork (@PathVariable String username, @PathVariable String work_book_id, @PathVariable String work_id) throws Exception {
        return new ResponseEntity<>(service.selectWork(username,work_book_id,work_id), HttpStatus.OK);
    }

    @GetMapping("/{username}/{work_book_id}")
    public ResponseEntity<List<WorkDTO>> selectWorkList (@PathVariable String username, @PathVariable String work_book_id) throws Exception {
        return new ResponseEntity<>(service.selectWorkList(username,work_book_id), HttpStatus.OK);
    }

    @PostMapping("/{work_book_id}")
    public ResponseEntity<WorkResultRealResponseDTO> selectWorkResult(@RequestBody List<WorkResultRequestDTO> result, @PathVariable String work_book_id) throws Exception{
        return new ResponseEntity<>(service.selectWorkResult(result,work_book_id),HttpStatus.OK);
    }

    @DeleteMapping("/{username}/{work_book_id}/{work_id}")
    public String deleteWork(@PathVariable String username, @PathVariable String work_book_id, @PathVariable String work_id) throws Exception{
        service.deleteWork(username,work_book_id,work_id);
        return "삭제완료";
    }
    @PutMapping("/{username}/{work_book_id}/{work_id}")
    public ResponseEntity<WorkDTO> updateWork(@PathVariable String username, @PathVariable String work_book_id, @PathVariable String work_id, @RequestBody WorkDTO dto) throws Exception {
        return new ResponseEntity<>(service.updateWork(username, work_book_id, work_id, dto), HttpStatus.OK);
    }

}
