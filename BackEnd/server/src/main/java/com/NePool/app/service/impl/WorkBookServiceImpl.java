package com.NePool.app.service.impl;

import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.dto.WorkBookRequestDTO;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.WorkBook;
import com.NePool.app.repository.CommentRepository;
import com.NePool.app.repository.UserRepository;
import com.NePool.app.repository.WorkBookRepository;
import com.NePool.app.repository.WorkRepository;
import com.NePool.app.service.WorkBookService;
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
public class WorkBookServiceImpl implements WorkBookService {
    public final WorkBookRepository workBookRepository;
    public final UserRepository userRepository;
    public final WorkRepository workRepository;
    public final CommentRepository commentRepository;
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
        WorkBook res = workBookRepository.save(dtoToEntity(dto, user.get(), pw.encode(random.nextInt(600) + "").replace("/", "")));
        return entityToDto(res);
    }

    @Override
    public WorkBookRequestDTO getWorkBook(String username, String work_book_id, Boolean check) throws Exception {
        WorkBook workBook = check(username, work_book_id);

        if (check) {
            workBook.upCount();
            workBookRepository.save(workBook);
        }
        return entityToDto(workBook);
    }

    @Override
    public PageResultDTO<WorkBookRequestDTO, WorkBook> getList(String username, PageRequestDTO page) throws Exception {
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
        Page<WorkBook> entity = workBookRepository.findByWriterUno(user.get().getUno(), page.getPageable(Sort.by("modDate").ascending()));
        Function<WorkBook, WorkBookRequestDTO> fn = (data -> entityToDto(data));
        return new PageResultDTO<>(entity, fn);
    }

    @Override
    public PageResultDTO<WorkBookRequestDTO, WorkBook> allListPage(PageRequestDTO page, String type) throws Exception {
        Page<WorkBook> entity;
        if(type==null) {
            entity = workBookRepository.findByShare(true,page.getPageable(Sort.by("modDate").descending()));
        }else {
            entity = workBookRepository.findByTypeAndShare(type,true,page.getPageable(Sort.by("modDate").descending()));
        }
        Function<WorkBook, WorkBookRequestDTO> fn = (data -> entityToDto(data));
        return new PageResultDTO<>(entity, fn);
    }

    @Override
    public List<WorkBookRequestDTO> allList(String type) throws Exception {
        List<WorkBook> entity;
        if(type==null) {
            entity = workBookRepository.findByShare(true);
        }else {
            entity = workBookRepository.findByTypeAndShare(type,true);
        }
        return entity.stream().map(data->entityToDto(data)).collect(Collectors.toList());
    }

    @Override
    public void delete(String username, String work_book_id) throws Exception {
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
        Long res = workBookRepository.deleteByWnoAndWriterUno(work_book_id, user.get().getUno());
        if (res == 0) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
    }

    @Override
    public boolean share(String username, String work_book_id) throws Exception {
        WorkBook workBook = check(username, work_book_id);
        if (workBook.getShare() == false) {
            workBook.setShare(true);
            workBookRepository.save(workBook);
            return true;
        }
        workBook.setShare(false);
        workBookRepository.save(workBook);
        return false;
    }

    @Override
    public WorkBookRequestDTO update(String username, String work_book_id, WorkBookRequestDTO dto) throws Exception {
        if (dto.getTitle().equals("") || dto.getContent().equals("")||dto.getType().equals("")) {
            throw new Exception("제목,설명, 타입 을 입력해주세요.");
        }
        WorkBook workBook = check(username, work_book_id);

        workBook.update(dto.getTitle(), dto.getContent(),dto.getType(),dto.getImage());
        return entityToDto(workBookRepository.save(workBook));
    }

    @Override
    public List<WorkBookRequestDTO> best4() throws Exception {
        Pageable pageable = PageRequest.of(0, 4,Sort.by("count").descending());
        Page<WorkBook> res = workBookRepository.findByShare(true,pageable);
        return res.stream().map(workBook -> entityToDto(workBook)).collect(Collectors.toList());
    }

    @Override
    public Long all() {
        return workBookRepository.count();
    }

    private WorkBook check(String username, String work_book_id) throws Exception {
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
        Optional<WorkBook> workBook = workBookRepository.findByWnoAndWriterUno(work_book_id, user.get().getUno());
        if (!workBook.isPresent()) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
        return workBook.get();
    }
}
