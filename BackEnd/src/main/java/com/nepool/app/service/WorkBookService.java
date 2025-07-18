package com.nepool.app.service;

import java.util.List;

import com.nepool.app.domain.user.entity.NePoolUser;
import com.nepool.app.domain.workbook.dto.WorkBookRequestDTO;
import com.nepool.app.domain.workbook.entity.WorkBook;
import com.nepool.app.util.dto.PageRequestDTO;
import com.nepool.app.util.dto.PageResultDTO;

import java.util.List;

public interface WorkBookService {
    WorkBookRequestDTO insertWorkBook(WorkBookRequestDTO dto) throws Exception;

    WorkBookRequestDTO selectWorkBook(String username, String work_book_id, Boolean check) throws Exception;

    PageResultDTO<WorkBookRequestDTO, WorkBook> selectWorkBookMyList(String username, Integer page, Integer size) throws Exception;

    PageResultDTO<WorkBookRequestDTO, WorkBook> selectWorkBookPageList(String type, Integer page, Integer size) throws Exception;

    List<WorkBookRequestDTO> selectWorkBookList(String type) throws Exception;

    String deleteWorkBook(String username, String work_book_id) throws Exception;

    String updateWorkBookShare(String username, String work_book_id) throws Exception;

    WorkBookRequestDTO updateWorkBook(String username, String work_book_id, WorkBookRequestDTO dto) throws Exception;


    Long selectWorkBookCount();

    List<WorkBookRequestDTO> selectWorkBookBest4() throws Exception;

    Long all();

    List<WorkBookRequestDTO> best4() throws Exception;
    default WorkBook dtoToEntity(WorkBookRequestDTO dto, NePoolUser user, String id) {
        return WorkBook.builder()
                .wno(id)
                .writer(user)
                .title(dto.getTitle())
                .share(false)
                .count(0L)
                .type(dto.getType())
                .image(dto.getImage())
                .content(dto.getContent()).build();
    }

    default WorkBookRequestDTO entityToDto(WorkBook entity) {
        return WorkBookRequestDTO.builder()
                .title(entity.getTitle())
                .content(entity.getContent())
                .username(entity.getWriter().getUsername())
                .id(entity.getWno())
                .count(entity.getCount())
                .type(entity.getType())
                .share(entity.getShare())
                .image(entity.getImage())
                .regDate(entity.getRegDate())
                .modDate(entity.getModDate())
                .build();
    }
}
