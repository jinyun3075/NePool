package com.nepool.app.service.impl;

import com.nepool.app.service.UploadService;
import com.nepool.app.util.dto.UploadResultDTO;

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


    @Override
    public List<UploadResultDTO> uploadFile(MultipartFile[] uploadFiles) throws Exception {
        List<UploadResultDTO> resultDTOList = new ArrayList<>();
       
        return resultDTOList;
    }
}
