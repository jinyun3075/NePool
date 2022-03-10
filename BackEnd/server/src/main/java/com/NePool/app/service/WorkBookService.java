package com.NePool.app.service;

import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.dto.WorkBookRequestDTO;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.WorkBook;

public interface WorkBookService {
    WorkBookRequestDTO register(WorkBookRequestDTO dto) throws Exception;

    WorkBookRequestDTO getWorkBook(String username, Long work_book_id) throws Exception;

    PageResultDTO<WorkBookRequestDTO, WorkBook> getList(String username, PageRequestDTO page) throws Exception;

    PageResultDTO<WorkBookRequestDTO, WorkBook> allList(PageRequestDTO page) throws Exception;

    void delete(String username, Long work_book_id) throws Exception;

    default WorkBook dtoToEntity(WorkBookRequestDTO dto, NePoolUser user) {
        return WorkBook.builder()
                .writer(user)
                .title(dto.getTitle())
                .share(false)
                .content(dto.getContent()).build();
    }

    default WorkBookRequestDTO entityToDto(WorkBook entity) {
        return WorkBookRequestDTO.builder()
                .title(entity.getTitle())
                .content(entity.getContent())
                .username(entity.getWriter().getUsername())
                .id(entity.getWno())
                .share(entity.getShare()).build();
    }
}
