package com.NePool.app.service;

import com.NePool.app.dto.WorkBookRequestDTO;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.WorkBook;

public interface WorkBookService {
    WorkBookRequestDTO register(WorkBookRequestDTO dto);
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
                .share(entity.getShare()).build();
    }
}
