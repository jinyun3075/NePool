package com.NePool.app.controller;

import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.dto.WorkBookRequestDTO;
import com.NePool.app.entity.WorkBook;
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
public class WorkBookCont {
    private final WorkBookService service;

    @PostMapping("/register")
    public ResponseEntity<WorkBookRequestDTO> register(@RequestBody WorkBookRequestDTO dto) throws Exception {
        return new ResponseEntity<>(service.register(dto), HttpStatus.OK);
    }

    @GetMapping("/{username}/{work_book_id}")
    public ResponseEntity<WorkBookRequestDTO> getWorkBook(@PathVariable("username") String username, @PathVariable("work_book_id") String work_book_id, @RequestParam(value = "check", required = false) Boolean check) throws Exception {
        if(check==null) {
            check=false;
        }
        return new ResponseEntity<>(service.getWorkBook(username, work_book_id, check), HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<PageResultDTO<WorkBookRequestDTO, WorkBook>> getList(@PathVariable String username, @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "size", required = false) Integer size) throws Exception {
        PageRequestDTO req = new PageRequestDTO();
        if (page != null && size != null) {
            req.setSize(size);
            req.setPage(page);
        }
        return new ResponseEntity<>(service.getList(username, req), HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<PageResultDTO<WorkBookRequestDTO, WorkBook>> allList(@RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "size", required = false) Integer size) throws Exception{
        PageRequestDTO req = new PageRequestDTO();
        if (page != null && size != null) {
            req.setSize(size);
            req.setPage(page);
        }
        return new ResponseEntity<>(service.allList(req),HttpStatus.OK);
    }

    @DeleteMapping("{username}/{work_book_id}")
    public String delete(@PathVariable String username, @PathVariable String work_book_id) throws Exception{
        service.delete(username,work_book_id);
        return "삭제완료";
    }

    @PutMapping("/share/{username}/{work_book_id}")
    public ResponseEntity<String> share(@PathVariable String username, @PathVariable String work_book_id) throws Exception{
        String res = "";
        if(service.share(username,work_book_id)) {
            res = "공유 성공";
        }else {
            res = "공유 해제";
        }
        return new ResponseEntity<>(res,HttpStatus.OK);
    }
    @PutMapping("/{username}/{work_book_id}")
    public ResponseEntity<WorkBookRequestDTO> update(@PathVariable String username, @PathVariable String work_book_id, @RequestBody WorkBookRequestDTO req) throws Exception{
        return new ResponseEntity<>(service.update(username,work_book_id,req),HttpStatus.OK);
    }

    @GetMapping("/best4")
    public ResponseEntity<List<WorkBookRequestDTO>> best4() throws Exception{
        return new ResponseEntity<>(service.best4(),HttpStatus.OK);
    }
}
