package com.NePool.app.service;

import com.NePool.app.dto.UploadResultDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UploadService {
    List<UploadResultDTO> upload(MultipartFile[] uploadFiles) throws Exception;
}
