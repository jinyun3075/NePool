package com.NePool.app.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;


@RestController
@RequestMapping("/upload")
@Log4j2
public class UploadCont {

    @Value("${org.zerock.upload.path}")
    private String uploadPath;

    @PostMapping("")
    public void uploadFile(MultipartFile[] uploadFiles) {
        for (MultipartFile file : uploadFiles) {
            if (file.getContentType().startsWith("image") == false) {
                log.warn("이미지가 아닙니다.");
                return;
            }

            String fileName = file.getOriginalFilename();

            String folderPath = makeFolder();

            String uuid = UUID.randomUUID().toString();

            String saveName = uploadPath + File.separator + folderPath + File.separator
                    + uuid + "_" + fileName;

            Path savePath = Paths.get(saveName);

            try{
                file.transferTo(savePath);
            } catch(IOException e) {
                e.printStackTrace();
            }

        }
    }

    private String makeFolder() {
        String str = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));

        String folderPath = str.replace("/", File.separator);

        File uploadPathFolder = new File(uploadPath, folderPath);

        if (uploadPathFolder.exists() == false) {
            uploadPathFolder.mkdirs();
        }
        return folderPath;
    }
}
