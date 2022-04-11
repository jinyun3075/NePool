package com.NePool.app.controller;

import com.NePool.app.dto.AnnouncementDTO;
import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.entity.Announcement;
import com.NePool.app.service.AnnouncementService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/announcement")
public class AnnouncementCont {

    private final AnnouncementService service;

    @PostMapping("/{user_id}")
    public ResponseEntity<AnnouncementDTO> register(@RequestBody AnnouncementDTO dto) throws Exception{
        return new ResponseEntity<>(service.register(dto), HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<PageResultDTO<AnnouncementDTO,Announcement>> getList(@RequestParam(value = "page",required = false) Integer page, @RequestParam(value = "size", required = false) Integer size){
        PageRequestDTO req = new PageRequestDTO();
        if(page!=null&&size!=null){
            req.setSize(size);
            req.setPage(page);
        }
        return new ResponseEntity<>(service.getList(req),HttpStatus.OK);
    }

    @PutMapping("/{user_id}")
    public ResponseEntity<AnnouncementDTO> update(@RequestBody AnnouncementDTO dto) {
        return new ResponseEntity<>(service.update(dto),HttpStatus.OK);
    }

    @DeleteMapping("/{user_id}")
    public ResponseEntity<String> delete(@RequestBody Long announcement_id) throws Exception{
        service.delete(announcement_id);
        return new ResponseEntity<>("삭제 완료",HttpStatus.OK);
    }
}
