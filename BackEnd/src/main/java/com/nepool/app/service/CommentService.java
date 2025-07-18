package com.nepool.app.service;

import com.nepool.app.domain.comment.dto.CommentRequestDTO;
import com.nepool.app.domain.comment.entity.Comment;
import com.nepool.app.domain.user.entity.NePoolUser;
import com.nepool.app.domain.workbook.entity.WorkBook;
import com.nepool.app.util.dto.PageRequestDTO;
import com.nepool.app.util.dto.PageResultDTO;

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
