package com.NePool.app.service.impl;

import com.NePool.app.domain.comment.dto.CommentRequestDTO;
import com.NePool.app.util.dto.PageRequestDTO;
import com.NePool.app.util.dto.PageResultDTO;
import com.NePool.app.domain.comment.entity.Comment;
import com.NePool.app.domain.user.entity.NePoolUser;
import com.NePool.app.domain.workbook.entity.WorkBook;
import com.NePool.app.domain.comment.repository.CommentRepository;
import com.NePool.app.domain.user.repository.UserRepository;
import com.NePool.app.domain.workbook.repository.WorkBookRepository;
import com.NePool.app.service.CommentService;
import com.NePool.app.util.exception.ServiceExceptionCheck;
import com.NePool.app.util.module.PageModule;
import com.NePool.app.util.module.BCryptModule;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
@Log4j2
@RequiredArgsConstructor
public class CommentServiceImpl extends ServiceExceptionCheck implements CommentService {
    private final UserRepository userRepository;
    private final WorkBookRepository workBookRepository;
    private final CommentRepository commentRepository;

    private final BCryptModule bCryptModule;

    private final PageModule pageModule;

    @Override
    public CommentRequestDTO insertComment(String user_id, String work_book_id, CommentRequestDTO dto) throws Exception {

        checkCommentDTO(dto);

        Optional<NePoolUser> user = userRepository.findById(user_id);
        checkUserEntity(user);

        Optional<WorkBook> workBook = workBookRepository.findById(work_book_id);
        checkWorkBookEntity(workBook);

        Comment entity = commentRepository.save(dtoToEntity(dto, work_book_id, user_id, bCryptModule.makeId()));

        return entityToDto(entity);
    }

    @Override
    public PageResultDTO<CommentRequestDTO, Comment> selectCommentList(String work_book_id, Integer page, Integer size) throws Exception {
        PageRequestDTO pageRequestDTO = pageModule.makePage(page,size);

        Optional<WorkBook> workBook = workBookRepository.findById(work_book_id);
        checkWorkBookEntity(workBook);

        Page<Comment> entity = commentRepository.findByWorkbookWno(work_book_id, pageRequestDTO.getPageable(Sort.by("modDate").descending()));
        checkCommentEntity(entity);

        Function<Comment, CommentRequestDTO> fn = (data -> entityToDto(data));
        return new PageResultDTO<>(entity, fn);
    }

    @Override
    public Double selectCommentLikeCount(String work_book_id) throws Exception {
        Optional<WorkBook> workBook = workBookRepository.findById(work_book_id);
        checkWorkBookEntity(workBook);

        List<Comment> list = commentRepository.findByWorkbookWno(work_book_id);
        int allLike = 0;
        for (Comment data : list) {
            allLike += data.getComLike();
        }
        return (Math.round((float) allLike / list.size()) * 10) / 10.0;
    }

    @Override
    public String deleteComment(String comment_id, String writer) throws Exception {
        Optional<Comment> entity = commentRepository.findById(comment_id);
        checkCommentEntity(entity);

        if (entity.get().getWriter().getName().equals(writer)) {
            commentRepository.deleteById(comment_id);
            return "삭제 완료";
        }
        return "삭제 실패 ex) 작성자가 다릅니다.";
    }
}
