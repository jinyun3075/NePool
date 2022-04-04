package com.NePool.app.service.impl;

import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.dto.ShareWorkBookDTO;
import com.NePool.app.dto.ShareWorkBookResultDTO;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.ShareWorkBook;
import com.NePool.app.entity.WorkBook;
import com.NePool.app.repository.ShareWorkBookRepository;
import com.NePool.app.repository.UserRepository;
import com.NePool.app.repository.WorkBookRepository;
import com.NePool.app.service.ShareWorkBookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
@Log4j2
@RequiredArgsConstructor
public class ShareWorkBookServiceImpl implements ShareWorkBookService {

    private final ShareWorkBookRepository shareRepository;
    private final WorkBookRepository workBookRepository;
    private final UserRepository userRepository;

    @Override
    public ShareWorkBookResultDTO register(ShareWorkBookDTO dto) throws Exception{
        Optional<NePoolUser> nePoolUser = userRepository.findById(dto.getUser_id());
        if(!nePoolUser.isPresent()) {
            throw new Exception("존재하지 않는 유저입니다.");
        }
        Optional<WorkBook> workBook = workBookRepository.findById(dto.getWork_book_id());
        if (!workBook.isPresent()) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
        Optional<ShareWorkBook> check = shareRepository.findByWorkBookWnoAndNePoolUserUno(dto.getWork_book_id(),dto.getUser_id());
        if(!check.isPresent()){
            return entityToDto(shareRepository.save(dtoToEntity(workBook.get(),nePoolUser.get())));
        }
        throw new Exception("이미 스크랩했습니다.");
    }

    @Override
    public PageResultDTO<ShareWorkBookResultDTO, ShareWorkBook> getList(String user_id, PageRequestDTO req) throws Exception {
        Optional<NePoolUser> nePoolUser = userRepository.findById(user_id);
        if(!nePoolUser.isPresent()) {
            throw new Exception("존재하지 않는 유저입니다.");
        }
        Page<ShareWorkBook> entity = shareRepository.findByNePoolUserUno(user_id,req.getPageable(Sort.by("modDate").ascending()));
        Function<ShareWorkBook,ShareWorkBookResultDTO> fn = (data-> entityToDto(data));
        return new PageResultDTO<>(entity,fn);
    }

    @Override
    public void delete(ShareWorkBookDTO dto) throws Exception {
        Optional<NePoolUser> user = userRepository.findById(dto.getUser_id());
        if (!user.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
        Long entity = shareRepository.deleteByWorkBookWnoAndNePoolUserUno(dto.getWork_book_id(),dto.getUser_id());
        if(entity == 0) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
    }
}
