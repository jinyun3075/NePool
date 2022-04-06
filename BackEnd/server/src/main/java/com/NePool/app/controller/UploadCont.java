package com.NePool.app.controller;

import com.NePool.app.dto.UploadResultDTO;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/upload")
@Log4j2
public class UploadCont {

    @Value("${org.zerock.upload.path}")
    private String uploadPath;

    @PostMapping("")
    public ResponseEntity<List<UploadResultDTO>> uploadFile(MultipartFile[] uploadFiles) throws Exception{
        List<UploadResultDTO> resultDTOList = new ArrayList<>();
        for (MultipartFile file : uploadFiles) {
            if (file.getContentType().startsWith("image") == false) {
                log.warn("이미지가 아닙니다.");
                log.info(file.getContentType());
                throw new Exception("이미지가 아닙니다.");
            }

            String fileName = file.getOriginalFilename();

            String folderPath = makeFolder();

            String uuid = UUID.randomUUID().toString();

            String saveName = uploadPath + File.separator + folderPath + File.separator
                    + uuid + "_" + fileName;

            Path savePath = Paths.get(saveName);

            try{
                file.transferTo(savePath);
                resultDTOList.add(new UploadResultDTO(fileName,uuid,folderPath));
            } catch(IOException e) {
                e.printStackTrace();
            }
        }
        return new ResponseEntity<>(resultDTOList,HttpStatus.OK);
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
