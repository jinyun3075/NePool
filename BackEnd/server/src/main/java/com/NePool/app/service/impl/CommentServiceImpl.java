package com.NePool.app.service.impl;

import com.NePool.app.dto.CommentRequestDTO;
import com.NePool.app.entity.Comment;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.WorkBook;
import com.NePool.app.repository.CommentRepository;
import com.NePool.app.repository.UserRepository;
import com.NePool.app.repository.WorkBookRepository;
import com.NePool.app.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

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
    public CommentRequestDTO register(String username, String work_book_id, CommentRequestDTO dto) throws Exception {
        if(dto.getContent().equals("")){
            throw new Exception("내용을 입력해 주세요");
        }
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
        Optional<WorkBook> workBook = workBookRepository.findById(work_book_id);
        if (!workBook.isPresent()) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
        Comment entity = commentRepository.save(dtoToEntity(dto,workBook.get(),user.get(),(pw.encode(random.nextInt(600)+"").replace("/",""))));
        return entityToDto(entity);
    }
}
