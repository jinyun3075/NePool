package com.NePool.app.service;

import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.dto.WorkBookRequestDTO;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.WorkBook;

import java.util.List;

public interface WorkBookService {
    WorkBookRequestDTO register(WorkBookRequestDTO dto) throws Exception;

    WorkBookRequestDTO getWorkBook(String username, String work_book_id, Boolean check) throws Exception;

    PageResultDTO<WorkBookRequestDTO, WorkBook> getList(String username, PageRequestDTO page) throws Exception;

    PageResultDTO<WorkBookRequestDTO, WorkBook> allListPage(PageRequestDTO page, String type) throws Exception;
    List<WorkBookRequestDTO> allList(String type) throws Exception;
    void delete(String username, String work_book_id) throws Exception;

    boolean share(String username, String work_book_id) throws Exception;

    WorkBookRequestDTO update(String username, String work_book_id, WorkBookRequestDTO dto) throws Exception;

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
                .regDate(entity.getRegDate())
                .modDate(entity.getModDate())
                .build();
    }
}
