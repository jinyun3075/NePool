package com.NePool.app.service.impl;

import com.NePool.app.dto.WorkDTO;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.WorkBook;
import com.NePool.app.repository.UserRepository;
import com.NePool.app.repository.WorkBookRepository;
import com.NePool.app.repository.WorkRepository;
import com.NePool.app.service.WorkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class WorkServiceImpl implements WorkService {
    private final WorkBookRepository workBookRepository;
    private final UserRepository userRepository;
    private final WorkRepository repository;
    @Override
    public WorkDTO register(WorkDTO dto,String username,Long work_book_id) throws Exception {
        if(dto.getAnswer_a().equals("")||dto.getAnswer_b().equals("")||dto.getAnswer_c().equals("")||dto.getAnswer_d().equals("")||dto.getAnswer_e().equals("")||dto.getQuestion().equals("")||dto.getCorrect()==0){
            throw new Exception("모든 요구사항을 입력해주세요.");
        }
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
        Optional<WorkBook> res = workBookRepository.findByWnoAndWriterUno(work_book_id,user.get().getUno());
        if (!res.isPresent()) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
        return entityToDto(repository.save(dtoToEntity(dto,res.get())));
    }
}
