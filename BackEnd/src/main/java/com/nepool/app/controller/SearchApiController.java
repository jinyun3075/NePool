package com.nepool.app.controller;

import com.nepool.app.util.dto.SearchDTO;
import com.nepool.app.service.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
@Log4j2
public class SearchApiController {

    private final SearchService service;

    @GetMapping("/{keyword}")
    public ResponseEntity<SearchDTO> selectUserAndWorkBook(@PathVariable(value = "keyword", required = false) String keyword) {
        return new ResponseEntity<>(service.selectUserAndWorkBook(keyword), HttpStatus.OK);
    }
}
