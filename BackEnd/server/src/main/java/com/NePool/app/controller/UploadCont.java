package com.NePool.app.controller;

import com.NePool.app.dto.UploadResultDTO;
import com.NePool.app.service.UploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;


@RestController
@RequestMapping("/upload")
@Log4j2
@RequiredArgsConstructor
public class UploadCont {

    private final UploadService uploadService;

    @PostMapping("")
    public ResponseEntity<List<UploadResultDTO>> uploadFile(MultipartFile[] uploadFiles) throws Exception {
        return new ResponseEntity<>(uploadService.upload(uploadFiles), HttpStatus.OK);
    }

}
