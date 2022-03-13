package com.NePool.app.service.impl;

import com.NePool.app.dto.WorkDTO;
import com.NePool.app.dto.WorkResultRequestDTO;
import com.NePool.app.dto.WorkResultResponseDTO;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.Work;
import com.NePool.app.entity.WorkBook;
import com.NePool.app.repository.UserRepository;
import com.NePool.app.repository.WorkBookRepository;
import com.NePool.app.repository.WorkRepository;
import com.NePool.app.service.WorkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class WorkServiceImpl implements WorkService {
    private final WorkBookRepository workBookRepository;
    private final UserRepository userRepository;
    private final WorkRepository workRepository;
    @Autowired
    private Random random;
    @Autowired
    private PasswordEncoder pw;
    @Override
    public WorkDTO register(WorkDTO dto,String username,String work_book_id) throws Exception {
        if(dto.getAnswer_a().equals("")||dto.getAnswer_b().equals("")||dto.getAnswer_c().equals("")||dto.getAnswer_d().equals("")||dto.getAnswer_e().equals("")||dto.getQuestion().equals("")||dto.getCorrect().equals("")){
            throw new Exception("모든 요구사항을 입력해주세요.");
        }
        WorkBook workBook = check(username,work_book_id);
        return entityToDto(workRepository.save(dtoToEntity(dto,workBook,pw.encode(random.nextInt(600)+"").replace("/",""))));
    }

    @Override
    public WorkDTO getWork(String username, String work_book_id, String work_id) throws Exception {
        check(username,work_book_id);
        Optional<Work> work = workRepository.findByQnoAndWorkBookWno(work_id,work_book_id);
        if (!work.isPresent()) {
            throw new Exception("존재하지 않는 문제입니다.");
        }
        return entityToDto(work.get());
    }

    @Override
    public List<WorkDTO> getList(String username, String work_book_id) throws Exception {
        check(username,work_book_id);
        List<Work> res = workRepository.findByWorkBookWno(work_book_id);
        Collections.shuffle(res);
        return res.stream().map(work -> entityToDto(work)).collect(Collectors.toList());
    }

    @Override
    public List<WorkResultResponseDTO> checkResult(List<WorkResultRequestDTO> result, String work_book_id) throws Exception {
        List<Work> work = workRepository.findByWorkBookWno(work_book_id);
        if(work.size()==0) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
        Map<String,Work> map = new HashMap<>();
        for(Work w : work) {
            map.put(w.getQno(),w);
        }
        List<WorkResultResponseDTO> res = new ArrayList<>();
        for(WorkResultRequestDTO check: result) {
            Work value = map.get(check.getId());
            boolean bool = false;
            if(value.getCorrect().equals(check.getCorrect())){
                bool=true;
            }
            res.add(WorkResultResponseDTO.builder()
                    .question(value.getQuestion())
                    .answer_a(value.getAnswer_a())
                    .answer_b(value.getAnswer_b())
                    .answer_c(value.getAnswer_c())
                    .answer_d(value.getAnswer_d())
                    .answer_e(value.getAnswer_e())
                    .correct(value.getCorrect())
                    .result(bool).build());
        }
        return res;
    }

    private WorkBook check(String username, String work_book_id) throws Exception{
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
        Optional<WorkBook> workBook = workBookRepository.findByWnoAndWriterUno(work_book_id,user.get().getUno());
        if (!workBook.isPresent()) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
        return workBook.get();
    }
}
