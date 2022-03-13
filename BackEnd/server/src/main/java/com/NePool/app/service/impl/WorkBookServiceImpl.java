package com.NePool.app.service.impl;

import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.dto.WorkBookRequestDTO;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.WorkBook;
import com.NePool.app.repository.UserRepository;
import com.NePool.app.repository.WorkBookRepository;
import com.NePool.app.service.WorkBookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
@Log4j2
public class WorkBookServiceImpl implements WorkBookService {
    public final WorkBookRepository workRepository;
    public final UserRepository userRepository;
    @Autowired
    private Random random;
    @Autowired
    private PasswordEncoder pw;

    @Override
    public WorkBookRequestDTO register(WorkBookRequestDTO dto) throws Exception {
        if (dto.getTitle().equals("") || dto.getContent().equals("")) {
            throw new Exception("제목과 설명을 입력해주세요.");
        }
        Optional<NePoolUser> user = userRepository.findByUsername(dto.getUsername());
        if (!user.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
        log.info(random.nextInt(600));
        WorkBook res = workRepository.save(dtoToEntity(dto, user.get(), pw.encode(random.nextInt(600) + "").replace("/", "")));
        return entityToDto(res);
    }

    @Override
    public WorkBookRequestDTO getWorkBook(String username, String work_book_id, Boolean check) throws Exception {
        WorkBook workBook = check(username, work_book_id);

        if (check) {
            workBook.upCount();
            workRepository.save(workBook);
        }
        return entityToDto(workBook);
    }

    @Override
    public PageResultDTO<WorkBookRequestDTO, WorkBook> getList(String username, PageRequestDTO page) throws Exception {
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
        Page<WorkBook> entity = workRepository.findByWriterUno(user.get().getUno(), page.getPageable(Sort.by("wno").ascending()));
        Function<WorkBook, WorkBookRequestDTO> fn = (data -> entityToDto(data));
        return new PageResultDTO<>(entity, fn);
    }

    @Override
    public PageResultDTO<WorkBookRequestDTO, WorkBook> allList(PageRequestDTO page) throws Exception {
        Page<WorkBook> entity = workRepository.findAll(page.getPageable(Sort.by("wno").descending()));
        Function<WorkBook, WorkBookRequestDTO> fn = (data -> entityToDto(data));
        return new PageResultDTO<>(entity, fn);
    }

    @Override
    public void delete(String username, String work_book_id) throws Exception {
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
        Long res = workRepository.deleteByWnoAndWriterUno(work_book_id, user.get().getUno());
        if (res == 0) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
    }

    @Override
    public boolean share(String username, String work_book_id) throws Exception {
        WorkBook workBook = check(username, work_book_id);
        if (workBook.getShare() == false) {
            workBook.setShare(true);
            workRepository.save(workBook);
            return true;
        }
        workBook.setShare(false);
        workRepository.save(workBook);
        return false;
    }

    @Override
    public WorkBookRequestDTO update(String username, String work_book_id, WorkBookRequestDTO dto) throws Exception {
        if (dto.getTitle().equals("") || dto.getContent().equals("")) {
            throw new Exception("제목과 설명을 입력해주세요.");
        }
        WorkBook workBook = check(username, work_book_id);

        workBook.update(dto.getTitle(), dto.getContent());
        return entityToDto(workRepository.save(workBook));
    }

    private WorkBook check(String username, String work_book_id) throws Exception {
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
        Optional<WorkBook> workBook = workRepository.findByWnoAndWriterUno(work_book_id, user.get().getUno());
        if (!workBook.isPresent()) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
        return workBook.get();
    }
}
