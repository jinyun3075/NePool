package com.NePool.app.service.impl;

import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.dto.UserDTO;
import com.NePool.app.dto.WorkBookRequestDTO;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.WorkBook;
import com.NePool.app.repository.UserRepository;
import com.NePool.app.repository.WorkBookRepository;
import com.NePool.app.service.WorkBookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
@Log4j2
public class WorkBookServiceImpl implements WorkBookService {
    public final WorkBookRepository repository;
    public final UserRepository userRepository;

    @Override
    public WorkBookRequestDTO register(WorkBookRequestDTO dto) throws Exception {
        if(dto.getTitle().equals("")||dto.getContent().equals("")){
            throw new Exception("제목과 설명을 입력해주세요.");
        }
        Optional<NePoolUser> user = userRepository.findByUsername(dto.getUsername());
        if (!user.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
        WorkBook res = repository.save(dtoToEntity(dto, user.get()));
        return entityToDto(res);
    }

    @Override
    public WorkBookRequestDTO getWorkBook(String username, Long work_book_id, Boolean check) throws Exception {
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
        Optional<WorkBook> res = repository.findByWnoAndWriterUno(work_book_id,user.get().getUno());
        if (!res.isPresent()) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }

        if(check) {
            res.get().upCount();
            repository.save(res.get());
        }
        return entityToDto(res.get());
    }

    @Override
    public PageResultDTO<WorkBookRequestDTO, WorkBook> getList(String username, PageRequestDTO page) throws Exception {
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
        Page<WorkBook> entity = repository.findByWriterUno(user.get().getUno(), page.getPageable(Sort.by("wno").ascending()));
        Function<WorkBook, WorkBookRequestDTO> fn = (data -> entityToDto(data));
        return new PageResultDTO<>(entity, fn);
    }

    @Override
    public PageResultDTO<WorkBookRequestDTO, WorkBook> allList(PageRequestDTO page) throws Exception {
        Page<WorkBook> entity = repository.findAll(page.getPageable(Sort.by("wno").descending()));
        Function<WorkBook, WorkBookRequestDTO> fn = (data -> entityToDto(data));
        return new PageResultDTO<>(entity, fn);
    }

    @Override
    public void delete(String username, Long work_book_id) throws Exception {
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
        Long res = repository.deleteByWnoAndWriterUno(work_book_id,user.get().getUno());
        if (res==0) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
    }

    @Override
    public boolean share(String username, Long work_book_id) throws Exception {
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
        Optional<WorkBook> res = repository.findByWnoAndWriterUno(work_book_id,user.get().getUno());
        if (!res.isPresent()) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
        if(res.get().getShare()==false) {
            res.get().setShare(true);
            repository.save(res.get());
            return true;
        }
        res.get().setShare(false);
        repository.save(res.get());
        return false;
    }

    @Override
    public WorkBookRequestDTO update(String username, Long work_book_id, WorkBookRequestDTO dto) throws Exception {
        if(dto.getTitle().equals("")||dto.getContent().equals("")){
            throw new Exception("제목과 설명을 입력해주세요.");
        }
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
        Optional<WorkBook> res = repository.findByWnoAndWriterUno(work_book_id,user.get().getUno());
        if (!res.isPresent()) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }

        res.get().update(dto.getTitle(), dto.getContent());
        return entityToDto(repository.save(res.get()));
    }
}
