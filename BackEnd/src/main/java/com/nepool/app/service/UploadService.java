package com.nepool.app.service;

import org.springframework.web.multipart.MultipartFile;

import com.nepool.app.util.dto.UploadResultDTO;

import java.util.List;

public interface UploadService {
    List<UploadResultDTO> uploadFile(MultipartFile[] uploadFiles) throws Exception;
}
