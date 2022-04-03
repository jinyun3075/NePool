package com.NePool.app.service;

import com.NePool.app.dto.*;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.ShareWorkBook;
import com.NePool.app.entity.WorkBook;

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
                .workBook(WorkBookRequestDTO.builder()
                        .id(entity.getWorkBook().getWno())
                        .title(entity.getWorkBook().getTitle())
                        .content(entity.getWorkBook().getContent())
                        .username(entity.getWorkBook().getWriter().getUsername())
                        .share(entity.getWorkBook().getShare())
                        .count(entity.getWorkBook().getCount())
                        .type(entity.getWorkBook().getType())
                        .modDate(entity.getWorkBook().getModDate())
                        .regDate(entity.getWorkBook().getRegDate())
                        .build())
                .user(UserDTO.builder()
                        .id(entity.getNePoolUser().getUno())
                        .password(entity.getNePoolUser().getPassword())
                        .name(entity.getNePoolUser().getName())
                        .username(entity.getNePoolUser().getUsername())
                        .email(entity.getNePoolUser().getEmail())
                        .password(entity.getNePoolUser().getPassword())
                        .build())
                .build();
    }
}
