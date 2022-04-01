package com.NePool.app.service.impl;

import com.NePool.app.dto.CommentRequestDTO;
import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.dto.UserDTO;
import com.NePool.app.entity.Comments;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.WorkBook;
import com.NePool.app.repository.CommentRepository;
import com.NePool.app.repository.UserRepository;
import com.NePool.app.repository.WorkBookRepository;
import com.NePool.app.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final UserRepository userRepository;
    private final WorkBookRepository workBookRepository;
    private final CommentRepository commentRepository;

    @Autowired
    private Random random;
    @Autowired
    private PasswordEncoder pw;

    @Override
    public CommentRequestDTO register(String user_id, String work_book_id, CommentRequestDTO dto) throws Exception {
        if(dto.getContent().equals("")){
            throw new Exception("내용을 입력해 주세요");
        }
        Optional<NePoolUser> user = userRepository.findById(user_id);
        if (!user.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
        Optional<WorkBook> workBook = workBookRepository.findById(work_book_id);
        if (!workBook.isPresent()) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
        Comments entity = commentRepository.save(dtoToEntity(dto,work_book_id,user_id,(pw.encode(random.nextInt(600)+"").replace("/",""))));
        return entityToDto(entity);
    }

    @Override
    public PageResultDTO<CommentRequestDTO,Comments> getList(String work_book_id, PageRequestDTO dto) throws Exception {
        Optional<WorkBook> workBook = workBookRepository.findById(work_book_id);
        if (!workBook.isPresent()) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
        Page<Comments> entity = commentRepository.findByWorkbookWno(work_book_id,dto.getPageable(Sort.by("modDate").descending()));
        if(entity.getTotalElements()==0){
            throw new Exception("만들어져있는 문제가 없습니다.");
        }
        Function<Comments, CommentRequestDTO> fn = (data -> entityToDto(data));
        return new PageResultDTO<>(entity, fn);
    }

    @Override
    public Float getLike(String work_book_id) throws Exception {
        Optional<WorkBook> workBook = workBookRepository.findById(work_book_id);
        if (!workBook.isPresent()) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
        log.info(workBook);
        List<Comments> list = commentRepository.findByWorkbookWno(work_book_id);
        log.info(list);
        int allLike=0;
        for(Comments data:list) {
            allLike+=data.getComLike();
        }
        return (Math.round(((float)allLike/list.size())*10)/10.0);
    }

    @Override
    public String delete(String comment_id, String writer) throws Exception {
        Optional<Comments> comments= commentRepository.findById(comment_id);
        if (!comments.isPresent()) {
            throw new Exception("존재하지 않는 리뷰입니다.");
        }
        if(comments.get().getWriter().getName().equals(writer)){
            commentRepository.deleteById(comment_id);
            return "삭제 완료";
        }
        return "삭제 실패 ex) 작성자가 다릅니다.";
    }
}
