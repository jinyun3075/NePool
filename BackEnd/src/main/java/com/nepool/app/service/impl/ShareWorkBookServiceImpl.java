package com.nepool.app.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.nepool.app.domain.shareworkbook.dto.ShareWorkBookDTO;
import com.nepool.app.domain.shareworkbook.dto.ShareWorkBookResultDTO;
import com.nepool.app.domain.shareworkbook.entity.ShareWorkBook;
import com.nepool.app.domain.shareworkbook.repository.ShareWorkBookRepository;
import com.nepool.app.domain.user.entity.NePoolUser;
import com.nepool.app.domain.user.repository.UserRepository;
import com.nepool.app.domain.workbook.entity.WorkBook;
import com.nepool.app.domain.workbook.repository.WorkBookRepository;
import com.nepool.app.service.ShareWorkBookService;
import com.nepool.app.util.dto.PageRequestDTO;
import com.nepool.app.util.dto.PageResultDTO;
import com.nepool.app.util.exception.ServiceExceptionCheck;
import com.nepool.app.util.module.BCryptModule;
import com.nepool.app.util.module.PageModule;

import java.util.Optional;
import java.util.function.Function;

@Service
@Log4j2
@RequiredArgsConstructor
public class ShareWorkBookServiceImpl extends ServiceExceptionCheck implements ShareWorkBookService {

    private final ShareWorkBookRepository shareRepository;
    private final WorkBookRepository workBookRepository;
    private final UserRepository userRepository;

    private final PageModule pageModule;

    @Override
    public ShareWorkBookResultDTO insertShareWorkBook(ShareWorkBookDTO dto) throws Exception {
        Optional<NePoolUser> nePoolUser = userRepository.findById(dto.getUser_id());
        checkUserEntity(nePoolUser);

        Optional<WorkBook> workBook = workBookRepository.findById(dto.getWork_book_id());
        checkWorkBookEntity(workBook);

        Optional<ShareWorkBook> shareWorkBook = shareRepository.findByWorkBookWnoAndNePoolUserUno(dto.getWork_book_id(), dto.getUser_id());
        checkShareWorkBookOverlap(shareWorkBook);

        return entityToDto(shareRepository.save(dtoToEntity(workBook.get(), nePoolUser.get())));
    }

    @Override
    public PageResultDTO<ShareWorkBookResultDTO, ShareWorkBook> selectShareWorkBookList(String user_id, Integer page, Integer size) throws Exception {
        PageRequestDTO pageRequestDTO = pageModule.makePage(page, size);

        Optional<NePoolUser> nePoolUser = userRepository.findById(user_id);
        checkUserEntity(nePoolUser);

        Page<ShareWorkBook> entity = shareRepository.findByNePoolUserUno(user_id, pageRequestDTO.getPageable(Sort.by("modDate").ascending()));
        Function<ShareWorkBook, ShareWorkBookResultDTO> fn = (data -> entityToDto(data));
        return new PageResultDTO<>(entity, fn);
    }

    @Override
    public String deleteShareWorkBook(ShareWorkBookDTO dto) throws Exception {
        Optional<NePoolUser> nePoolUser = userRepository.findById(dto.getUser_id());
        checkUserEntity(nePoolUser);

        Long check = shareRepository.deleteByWorkBookWnoAndNePoolUserUno(dto.getWork_book_id(), dto.getUser_id());
        checkDelete(check);

        return "삭제 완료";
    }

    @Override
    public Long selectShareWorkBookCount(String work_book_id) throws Exception {
        Optional<WorkBook> workBook = workBookRepository.findById(work_book_id);
        checkWorkBookEntity(workBook);

        return shareRepository.countByWorkBookWno(work_book_id);
    }
}
