package com.NePool.app.service.impl;

import com.NePool.app.dto.UploadResultDTO;
import com.NePool.app.service.UploadService;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Log4j2
@RequiredArgsConstructor
public class UploadServiceImpl implements UploadService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3Client amazonS3Client;
    @Override
    public List<UploadResultDTO> upload(MultipartFile[] uploadFiles) throws Exception {
        List<UploadResultDTO> resultDTOList = new ArrayList<>();
        for (MultipartFile file : uploadFiles) {
            if (file.getContentType().startsWith("image") == false) {
                log.warn("이미지가 아닙니다.");
                log.info(file.getContentType());
                throw new Exception("이미지가 아닙니다.");
            }

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());

            String fileName = file.getOriginalFilename();
            String folderPath = LocalDate.now().format(DateTimeFormatter.ofPattern("MM/dd"));
            String uuid = UUID.randomUUID().toString();

            String saveName = folderPath + "/" + uuid + "_" + fileName;

            try(InputStream inputStream = file.getInputStream()){
                amazonS3Client.putObject(new PutObjectRequest(bucket, saveName,inputStream,objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead));
            } catch (IOException e){
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            String imageUrl = amazonS3Client.getUrl(bucket, saveName).toString();
            resultDTOList.add(new UploadResultDTO(fileName, uuid, folderPath,imageUrl));
        }
        return resultDTOList;
    }
}
