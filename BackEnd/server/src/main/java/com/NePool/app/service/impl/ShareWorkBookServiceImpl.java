package com.NePool.app.service.impl;

import com.NePool.app.dto.ShareWorkBookDTO;
import com.NePool.app.repository.ShareWorkBookRepository;
import com.NePool.app.service.ShareWorkBookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@RequiredArgsConstructor
public class ShareWorkBookServiceImpl implements ShareWorkBookService {
    private final ShareWorkBookRepository shareRepository;
    @Override
    public ShareWorkBookDTO register(ShareWorkBookDTO dto) {
        log.info(dto);
        return null;
    }
}
