package com.NePool.app.service.impl;

import com.NePool.app.util.dto.PageRequestDTO;
import com.NePool.app.util.dto.PageResultDTO;
import com.NePool.app.domain.workbook.dto.WorkBookRequestDTO;
import com.NePool.app.domain.user.entity.NePoolUser;
import com.NePool.app.domain.workbook.entity.WorkBook;
import com.NePool.app.domain.comment.repository.CommentRepository;
import com.NePool.app.domain.user.repository.UserRepository;
import com.NePool.app.domain.workbook.repository.WorkBookRepository;
import com.NePool.app.domain.work.repository.WorkRepository;

import com.NePool.app.service.WorkBookService;
import com.NePool.app.util.exception.ServiceExceptionCheck;
import com.NePool.app.util.module.BCryptModule;
import com.NePool.app.util.module.PageModule;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class WorkBookServiceImpl extends ServiceExceptionCheck implements WorkBookService {
    public final WorkBookRepository workBookRepository;
    public final UserRepository userRepository;
    public final WorkRepository workRepository;
    public final CommentRepository commentRepository;

    private final BCryptModule bCryptModule;

    private final PageModule pageModule;

    @Override
    public WorkBookRequestDTO insertWorkBook(WorkBookRequestDTO dto) throws Exception {
        checkWorkBookDTO(dto);

        Optional<NePoolUser> user = userRepository.findByUsername(dto.getUsername());
        checkUserEntity(user);

        WorkBook res = workBookRepository.save(dtoToEntity(dto, user.get(), bCryptModule.makeId()));
        return entityToDto(res);
    }

    @Override
    public WorkBookRequestDTO selectWorkBook(String username, String work_book_id, Boolean check) throws Exception {
        if (check == null) {
            check = false;
        }

        Optional<NePoolUser> user = userRepository.findByUsername(username);
        checkUserEntity(user);

        Optional<WorkBook> workBook = workBookRepository.findByWnoAndWriterUno(work_book_id, user.get().getUno());
        checkWorkBookEntity(workBook);

        if (check) {
            workBook.get().upCount();
            workBookRepository.save(workBook.get());
        }
        return entityToDto(workBook.get());
    }

    @Override
    public PageResultDTO<WorkBookRequestDTO, WorkBook> selectWorkBookMyList(String username, Integer page, Integer size) throws Exception {
        PageRequestDTO pageRequestDTO = pageModule.makePage(page, size);

        Optional<NePoolUser> user = userRepository.findByUsername(username);
        checkUserEntity(user);

        Page<WorkBook> entity = workBookRepository.findByWriterUno(user.get().getUno(), pageRequestDTO.getPageable(Sort.by("regDate").ascending()));
        Function<WorkBook, WorkBookRequestDTO> fn = (data -> entityToDto(data));
        return new PageResultDTO<>(entity, fn);
    }

    @Override
    public PageResultDTO<WorkBookRequestDTO, WorkBook> selectWorkBookPageList(String type, Integer page, Integer size) throws Exception {
        PageRequestDTO pageRequestDTO = pageModule.makePage(page, size);

        type = checkType(type);

        Page<WorkBook> entity;
        if (type == null) {
            entity = workBookRepository.findByShare(true, pageRequestDTO.getPageable(Sort.by("regDate").descending()));
        } else {
            entity = workBookRepository.findByTypeAndShare(type, true, pageRequestDTO.getPageable(Sort.by("regDate").descending()));
        }
        Function<WorkBook, WorkBookRequestDTO> fn = (data -> entityToDto(data));
        return new PageResultDTO<>(entity, fn);
    }

    @Override
    public List<WorkBookRequestDTO> selectWorkBookList(String type) throws Exception {
        type = checkType(type);

        List<WorkBook> entity;
        if (type == null) {
            entity = workBookRepository.findByShare(true);
        } else {
            entity = workBookRepository.findByTypeAndShare(type, true);
        }
        return entity.stream().map(data -> entityToDto(data)).collect(Collectors.toList());
    }

    public String checkType(String type) {
        if (type != null && type.equals("all")) {
            type = null;
        }
        return type;
    }

    @Override
    public String deleteWorkBook(String username, String work_book_id) throws Exception {
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        checkUserEntity(user);

        Long check = workBookRepository.deleteByWnoAndWriterUno(work_book_id, user.get().getUno());
        checkDelete(check);

        return "삭제 완료";
    }

    @Override
    public String updateWorkBookShare(String username, String work_book_id) throws Exception {
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        checkUserEntity(user);

        Optional<WorkBook> workBook = workBookRepository.findByWnoAndWriterUno(work_book_id, user.get().getUno());
        checkWorkBookEntity(workBook);

        if (workBook.get().getShare() == false) {
            workBook.get().setShare(true);
            workBookRepository.save(workBook.get());
            return "공유 성공";
        }
        workBook.get().setShare(false);
        workBookRepository.save(workBook.get());
        return "공유 해제";
    }

    @Override
    public WorkBookRequestDTO updateWorkBook(String username, String work_book_id, WorkBookRequestDTO dto) throws Exception {
        checkWorkBookDTO(dto);

        Optional<NePoolUser> user = userRepository.findByUsername(username);
        checkUserEntity(user);

        Optional<WorkBook> workBook = workBookRepository.findByWnoAndWriterUno(work_book_id, user.get().getUno());
        checkWorkBookEntity(workBook);

        workBook.get().update(dto.getTitle(), dto.getContent(), dto.getType(), dto.getImage());
        return entityToDto(workBookRepository.save(workBook.get()));
    }

    @Override
    public List<WorkBookRequestDTO> selectWorkBookBest4() throws Exception {
        Pageable pageable = PageRequest.of(0, 4, Sort.by("count").descending());
        Page<WorkBook> res = workBookRepository.findByShare(true, pageable);
        return res.stream().map(workBook -> entityToDto(workBook)).collect(Collectors.toList());
    }

    @Override
    public Long selectWorkBookCount() {
        return workBookRepository.count();
    }
}
