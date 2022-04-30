package com.NePool.app.util.exception;

import com.NePool.app.domain.comment.dto.CommentRequestDTO;
import com.NePool.app.domain.comment.entity.Comment;
import com.NePool.app.domain.user.entity.NePoolUser;
import com.NePool.app.domain.workbook.entity.WorkBook;
import org.springframework.data.domain.Page;

import java.util.Optional;

public class ServiceExceptionCheck {
    public void checkCommentDTO(CommentRequestDTO dto) throws Exception {
        if (dto.getContent().equals("")) {
            throw new Exception("내용을 입력해 주세요");
        }
    }

    public void checkCommentEntity(Page<Comment> page) throws Exception{
        if (page.getTotalElements() == 0) {
            throw new Exception("리뷰가 없습니다.");
        }
    }

    public void checkCommentEntity(Optional<Comment> entity) throws Exception {
        if (!entity.isPresent()) {
            throw new Exception("존재하지 않는 리뷰입니다.");
        }
    }

    public void checkUserEntity(Optional<NePoolUser> entity) throws Exception {

        if (!entity.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
    }

    public void checkWorkBookEntity(Optional<WorkBook> entity) throws Exception {
        if (!entity.isPresent()) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
    }

}
