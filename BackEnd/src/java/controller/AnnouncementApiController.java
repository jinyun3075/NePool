package com.NePool.app.controller;

import com.NePool.app.domain.announcement.dto.AnnouncementDTO;
import com.NePool.app.util.dto.PageRequestDTO;
import com.NePool.app.util.dto.PageResultDTO;
import com.NePool.app.domain.announcement.entity.Announcement;
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
public class AnnouncementApiController {

    private final AnnouncementService service;

    @PostMapping("/{user_id}")
    public ResponseEntity<AnnouncementDTO> insertAnnouncement(@RequestBody AnnouncementDTO dto){
        return new ResponseEntity<>(service.insertAnnouncement(dto), HttpStatus.OK);
    }

    @GetMapping("/show/{announcement_id}")
    public ResponseEntity<AnnouncementDTO> selectAnnouncement(@PathVariable Long announcement_id) {
        return new ResponseEntity<>(service.selectAnnouncement(announcement_id),HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<PageResultDTO<AnnouncementDTO, Announcement>> selectAnnouncementList(@RequestParam(value = "page",required = false) Integer page, @RequestParam(value = "size", required = false) Integer size){
        PageRequestDTO req = new PageRequestDTO();
        if(page!=null&&size!=null){
            req.setSize(size);
            req.setPage(page);
        }
        return new ResponseEntity<>(service.selectAnnouncementList(req),HttpStatus.OK);
    }

    @PutMapping("/{user_id}")
    public ResponseEntity<AnnouncementDTO> updateAnnouncement(@RequestBody AnnouncementDTO dto) {
        return new ResponseEntity<>(service.updateAnnouncement(dto),HttpStatus.OK);
    }

    @DeleteMapping("/{user_id}")
    public ResponseEntity<String> deleteAnnouncement(@RequestBody Long announcement_id) throws Exception{
        service.deleteAnnouncement(announcement_id);
        return new ResponseEntity<>("삭제 완료",HttpStatus.OK);
    }
}
