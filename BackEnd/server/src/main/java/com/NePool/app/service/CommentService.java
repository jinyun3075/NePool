package com.NePool.app.service;

import com.NePool.app.dto.CommentRequestDTO;
import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.entity.Comments;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.WorkBook;

import java.util.List;

public interface CommentService {
    CommentRequestDTO register(String username, String work_book_id, CommentRequestDTO dto) throws Exception;

    PageResultDTO<CommentRequestDTO,Comments> getList(String work_book_id, PageRequestDTO dto) throws Exception;
    Float getLike(String work_book_id) throws Exception;

    String delete(String comment_id,String writer) throws Exception;
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
                .comLike(dto.getLike())
                .workbook(workBook)
                .writer(user)
                .build();
    }
    default CommentRequestDTO entityToDto(Comments entity) {
        return CommentRequestDTO.builder()
                .id(entity.getCom_no())
                .content(entity.getContent())
                .like(entity.getComLike())
                .writer(entity.getWriter().getName())
                .regDate(entity.getRegDate())
                .modDate(entity.getModDate())
                .build();
    }
}
