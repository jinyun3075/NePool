package com.NePool.app.controller;

import com.NePool.app.TestDto;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
@Log4j2
public class TestCont {
    @GetMapping({"/","list"})
    public TestDto list(TestDto dto) {
        log.info(dto);
        return dto;
    }
    @GetMapping("/{one}/{title}")
    public TestDto list2(TestDto dto) {
        log.info(dto);
        return dto;
    }
    @GetMapping("/a/{one}/{title}")
    public void list3(@PathVariable("one") Long one, @PathVariable("title") String title){
        log.info(one+title);
    }
    @PostMapping("/te")
    public TestDto pos2(@RequestBody TestDto dto) {
        log.info(dto);
        return dto;
    }
}
