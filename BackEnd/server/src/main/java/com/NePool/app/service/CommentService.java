package com.NePool.app.service;

import com.NePool.app.dto.CommentRequestDTO;
import com.NePool.app.entity.Comment;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.WorkBook;

public interface CommentService {
    CommentRequestDTO register(String username, String work_book_id, CommentRequestDTO dto) throws Exception;

    default Comment dtoToEntity(CommentRequestDTO dto, WorkBook workBook, NePoolUser user,String id) {
        return Comment.builder()
                .cno(id)
                .content(dto.getContent())
                .like(0l)
                .workBook(workBook)
                .writer(user)
                .build();
    }
    default CommentRequestDTO entityToDto(Comment entity) {
        return CommentRequestDTO.builder()
                .id(entity.getCno())
                .content(entity.getContent())
                .like(entity.getLike())
                .writer(entity.getWriter().getName()).build();
    }
}
