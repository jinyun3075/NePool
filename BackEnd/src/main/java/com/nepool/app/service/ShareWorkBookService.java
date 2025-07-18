package com.nepool.app.service;

import com.nepool.app.domain.shareworkbook.dto.ShareWorkBookDTO;
import com.nepool.app.domain.shareworkbook.dto.ShareWorkBookResultDTO;
import com.nepool.app.domain.shareworkbook.entity.ShareWorkBook;
import com.nepool.app.domain.user.dto.UserDTO;
import com.nepool.app.domain.user.entity.NePoolUser;
import com.nepool.app.domain.workbook.dto.WorkBookRequestDTO;
import com.nepool.app.domain.workbook.entity.WorkBook;
import com.nepool.app.util.dto.PageRequestDTO;
import com.nepool.app.util.dto.PageResultDTO;

public interface ShareWorkBookService {
    ShareWorkBookResultDTO insertShareWorkBook(ShareWorkBookDTO dto) throws Exception;

    PageResultDTO<ShareWorkBookResultDTO, ShareWorkBook> selectShareWorkBookList(String user_id, Integer page, Integer size) throws Exception;

    String deleteShareWorkBook(ShareWorkBookDTO dto) throws Exception;

    Long selectShareWorkBookCount(String work_book_id) throws Exception;

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
                        .image(entity.getWorkBook().getImage())
                        .type(entity.getWorkBook().getType())
                        .modDate(entity.getWorkBook().getModDate())
                        .regDate(entity.getWorkBook().getRegDate())
                        .build())
                .user(UserDTO.builder()
                        .id(entity.getNePoolUser().getUno())
                        .password(entity.getNePoolUser().getPassword())
                        .name(entity.getNePoolUser().getName())
                        .image(entity.getNePoolUser().getImage())
                        .username(entity.getNePoolUser().getUsername())
                        .email(entity.getNePoolUser().getEmail())
                        .password(entity.getNePoolUser().getPassword())
                        .build())
                .build();
    }
}
