package com.NePool.app.service;

import com.NePool.app.dto.CommentRequestDTO;
import com.NePool.app.entity.Comments;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.WorkBook;

public interface CommentService {
    CommentRequestDTO register(String username, String work_book_id, CommentRequestDTO dto) throws Exception;

    default Comments dtoToEntity(CommentRequestDTO dto, String workBook_id, String user_id,String id) {
        WorkBook workBook = WorkBook.builder()
                .wno(workBook_id)
                .build();
        NePoolUser user = NePoolUser.builder()
                .uno(user_id)
                .build();
        return Comments.builder()
                .com_no(id)
                .content(dto.getContent())
                .comLike(0l)
                .workbook(workBook)
                .writer(user)
                .build();
    }
    default CommentRequestDTO entityToDto(Comments entity) {
        return CommentRequestDTO.builder()
                .id(entity.getCom_no())
                .content(entity.getContent())
                .like(entity.getComLike())
                .writer(entity.getWriter().getName()).build();
    }
}
