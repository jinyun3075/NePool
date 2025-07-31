package com.nepool.app.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nepool.app.domain.work.dto.WorkDTO;
import com.nepool.app.domain.work.dto.WorkResultRealResponseDTO;
import com.nepool.app.domain.work.dto.WorkResultRequestDTO;
import com.nepool.app.service.WorkService;

import java.util.List;

@RestController
@RequestMapping("/api/work")
@Log4j2
@RequiredArgsConstructor
public class WorkApiController {
    private final WorkService service;

    @PostMapping("/{username}/{work_book_id}")
    public ResponseEntity<WorkDTO> insertWork(@RequestBody WorkDTO dto, @PathVariable("username") String username, @PathVariable("work_book_id") String work_book_id) throws Exception {
        return new ResponseEntity<>(service.insertWork(dto, username, work_book_id), HttpStatus.OK);
    }

    @GetMapping("/{username}/{work_book_id}/{work_id}")
    public ResponseEntity<WorkDTO> selectWork(@PathVariable("username") String username, @PathVariable("work_book_id") String work_book_id, @PathVariable("work_id") String work_id) throws Exception {
        return new ResponseEntity<>(service.selectWork(username, work_book_id, work_id), HttpStatus.OK);
    }

    @GetMapping("/{username}/{work_book_id}")
    public ResponseEntity<List<WorkDTO>> selectWorkList(@PathVariable("username") String username, @PathVariable("work_book_id") String work_book_id) throws Exception {
        return new ResponseEntity<>(service.selectWorkList(username, work_book_id), HttpStatus.OK);
    }

    @PostMapping("/{work_book_id}")
    public ResponseEntity<WorkResultRealResponseDTO> selectWorkResult(@RequestBody List<WorkResultRequestDTO> result, @PathVariable("work_book_id") String work_book_id) throws Exception {
        return new ResponseEntity<>(service.selectWorkResult(result, work_book_id), HttpStatus.OK);
    }

    @DeleteMapping("/{username}/{work_book_id}/{work_id}")
    public ResponseEntity<String> deleteWork(@PathVariable("username") String username, @PathVariable("work_book_id") String work_book_id, @PathVariable("work_id") String work_id) throws Exception {
        return new ResponseEntity<>(service.deleteWork(username, work_book_id, work_id), HttpStatus.OK);
    }

    @PutMapping("/{username}/{work_book_id}/{work_id}")
    public ResponseEntity<WorkDTO> updateWork(@PathVariable("username") String username, @PathVariable("work_book_id") String work_book_id, @PathVariable("work_id") String work_id, @RequestBody WorkDTO dto) throws Exception {
        return new ResponseEntity<>(service.updateWork(username, work_book_id, work_id, dto), HttpStatus.OK);
    }

}
