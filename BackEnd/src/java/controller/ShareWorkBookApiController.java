package com.NePool.app.controller;

import com.NePool.app.util.dto.PageRequestDTO;
import com.NePool.app.util.dto.PageResultDTO;
import com.NePool.app.domain.shareworkbook.dto.ShareWorkBookDTO;
import com.NePool.app.domain.shareworkbook.dto.ShareWorkBookResultDTO;
import com.NePool.app.domain.shareworkbook.entity.ShareWorkBook;
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
public class ShareWorkBookApiController {
    private final ShareWorkBookService service;

    @PostMapping("/register")
    public ResponseEntity<ShareWorkBookResultDTO> insertShareWorkBook(@RequestBody ShareWorkBookDTO dto) throws Exception{
        return new ResponseEntity<>(service.insertShareWorkBook(dto), HttpStatus.OK);
    }

    @GetMapping("/{user_id}")
    public ResponseEntity<PageResultDTO<ShareWorkBookResultDTO, ShareWorkBook>> selectShareWorkBookList(@PathVariable String user_id, @RequestParam(value = "page",required = false) Integer page, @RequestParam(value = "size", required = false) Integer size) throws Exception{
        PageRequestDTO req = new PageRequestDTO();
        if(page!=null&&size!=null){
            req.setSize(size);
            req.setPage(page);
        }
        return new ResponseEntity<>(service.selectShareWorkBookList(user_id,req),HttpStatus.OK);
    }

    @DeleteMapping("")
    public String updateShareWorkBook(@RequestBody ShareWorkBookDTO dto) throws Exception {
        service.deleteShareWorkBook(dto);
        return "삭제 완료";
    }

    @GetMapping("/count/{work_book_id}")
    public Long countShareWorkBook(@PathVariable String work_book_id) throws Exception {
        return service.selectShareWorkBookCount(work_book_id);
    }
}
