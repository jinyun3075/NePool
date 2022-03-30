package com.NePool.app.controller;

import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.dto.ShareWorkBookDTO;
import com.NePool.app.dto.ShareWorkBookResultDTO;
import com.NePool.app.entity.ShareWorkBook;
import com.NePool.app.service.ShareWorkBookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/share")
@Log4j2
@RequiredArgsConstructor
public class ShareWorkBookCont {
    private final ShareWorkBookService service;

    @PostMapping("/register")
    public ResponseEntity<ShareWorkBookResultDTO> register(@RequestBody ShareWorkBookDTO dto) throws Exception{
        return new ResponseEntity<>(service.register(dto), HttpStatus.OK);
    }

    @GetMapping("/{user_id}")
    public ResponseEntity<PageResultDTO<ShareWorkBookResultDTO, ShareWorkBook>> getList(@PathVariable String user_id, @RequestParam(value = "page",required = false) Integer page, @RequestParam(value = "size", required = false) Integer size) throws Exception{
        PageRequestDTO req = new PageRequestDTO();
        if(page!=null&&size!=null){
            req.setSize(size);
            req.setPage(page);
        }
        return new ResponseEntity<>(service.getList(user_id,req),HttpStatus.OK);
    }
}
