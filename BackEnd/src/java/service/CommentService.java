package com.NePool.app.service;

import com.NePool.app.domain.comment.dto.CommentRequestDTO;
import com.NePool.app.util.dto.PageRequestDTO;
import com.NePool.app.util.dto.PageResultDTO;
import com.NePool.app.domain.comment.entity.Comment;
import com.NePool.app.domain.user.entity.NePoolUser;
import com.NePool.app.domain.workbook.entity.WorkBook;

public interface CommentService {
    CommentRequestDTO insertComment(String username, String work_book_id, CommentRequestDTO dto) throws Exception;

    PageResultDTO<CommentRequestDTO, Comment> selectCommentList(String work_book_id, Integer page, Integer size) throws Exception;

    Double selectCommentLikeCount(String work_book_id) throws Exception;

    String deleteComment(String comment_id, String writer) throws Exception;

    default Comment dtoToEntity(CommentRequestDTO dto, String workBook_id, String user_id, String id) {
        WorkBook workBook = WorkBook.builder()
                .wno(workBook_id)
                .build();
        NePoolUser user = NePoolUser.builder()
                .uno(user_id)
                .build();
        return Comment.builder()
                .com_no(id)
                .content(dto.getContent())
                .comLike(dto.getLike())
                .workbook(workBook)
                .writer(user)
                .build();
    }

    default CommentRequestDTO entityToDto(Comment entity) {
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
