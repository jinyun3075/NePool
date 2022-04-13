package com.NePool.app.service;

import com.NePool.app.domain.shareworkbook.dto.ShareWorkBookDTO;
import com.NePool.app.domain.shareworkbook.dto.ShareWorkBookResultDTO;
import com.NePool.app.domain.user.dto.UserDTO;
import com.NePool.app.domain.workbook.dto.WorkBookRequestDTO;
import com.NePool.app.domain.user.entity.NePoolUser;
import com.NePool.app.domain.shareworkbook.entity.ShareWorkBook;
import com.NePool.app.domain.workbook.entity.WorkBook;
import com.NePool.app.util.dto.PageRequestDTO;
import com.NePool.app.util.dto.PageResultDTO;

public interface ShareWorkBookService {
    ShareWorkBookResultDTO insertShareWorkBook(ShareWorkBookDTO dto) throws Exception;
    PageResultDTO<ShareWorkBookResultDTO, ShareWorkBook> selectShareWorkBookList(String user_id, PageRequestDTO req) throws Exception;
    void deleteShareWorkBook(ShareWorkBookDTO dto) throws Exception;
    Long selectShareWorkBookCount (String work_book_id)throws Exception;
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
