package com.NePool.app.service;

import com.NePool.app.util.dto.UploadResultDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UploadService {
    List<UploadResultDTO> uploadFile(MultipartFile[] uploadFiles) throws Exception;
}
