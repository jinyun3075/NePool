package com.NePool.app.service;

import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.dto.ShareWorkBookDTO;
import com.NePool.app.dto.ShareWorkBookResultDTO;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.ShareWorkBook;
import com.NePool.app.entity.WorkBook;
import org.springframework.http.ResponseEntity;

public interface ShareWorkBookService {
    ShareWorkBookResultDTO register(ShareWorkBookDTO dto) throws Exception;
    PageResultDTO<ShareWorkBookResultDTO, ShareWorkBook> getList(String user_id, PageRequestDTO req) throws Exception;
    void delete(ShareWorkBookDTO dto) throws  Exception;
    default ShareWorkBook dtoToEntity(WorkBook workBook, NePoolUser user) {
        return ShareWorkBook.builder()
                .workBook(workBook)
                .nePoolUser(user)
                .build();
    }
    default ShareWorkBookResultDTO entityToDto(ShareWorkBook entity) {
        return ShareWorkBookResultDTO.builder()
                .workBook(entity.getWorkBook())
                .nePoolUser(entity.getNePoolUser())
                .build();
    }
}
