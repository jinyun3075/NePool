package com.NePool.app.service.impl;

import com.NePool.app.domain.work.dto.WorkDTO;
import com.NePool.app.domain.work.dto.WorkResultRealResponseDTO;
import com.NePool.app.domain.work.dto.WorkResultRequestDTO;
import com.NePool.app.domain.work.dto.WorkResultResponseDTO;
import com.NePool.app.domain.user.entity.NePoolUser;
import com.NePool.app.domain.work.entity.Work;
import com.NePool.app.domain.workbook.entity.WorkBook;
import com.NePool.app.domain.user.repository.UserRepository;
import com.NePool.app.domain.workbook.repository.WorkBookRepository;
import com.NePool.app.domain.work.repository.WorkRepository;
import com.NePool.app.service.WorkService;
import com.NePool.app.util.exception.ServiceExceptionCheck;
import com.NePool.app.util.module.BCryptModule;
import com.NePool.app.util.module.PageModule;
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
public class WorkServiceImpl extends ServiceExceptionCheck implements WorkService {
    private final WorkBookRepository workBookRepository;
    private final UserRepository userRepository;
    private final WorkRepository workRepository;

    private final BCryptModule bCryptModule;

    @Override
    public WorkDTO insertWork(WorkDTO dto, String username, String work_book_id) throws Exception {
        checkWorkDTO(dto);

        Optional<NePoolUser> user = userRepository.findByUsername(username);
        checkUserEntity(user);

        Optional<WorkBook> workBook = workBookRepository.findByWnoAndWriterUno(work_book_id, user.get().getUno());
        checkWorkBookEntity(workBook);

        return entityToDto(workRepository.save(dtoToEntity(dto, workBook.get(), bCryptModule.makeId())));
    }

    @Override
    public WorkDTO selectWork(String username, String work_book_id, String work_id) throws Exception {
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        checkUserEntity(user);

        Optional<WorkBook> workBook = workBookRepository.findByWnoAndWriterUno(work_book_id, user.get().getUno());
        checkWorkBookEntity(workBook);

        Optional<Work> work = workRepository.findByQnoAndWorkBookWno(work_id, work_book_id);
        checkWorkEntity(work);

        return entityToDto(work.get());
    }

    @Override
    public List<WorkDTO> selectWorkList(String username, String work_book_id) throws Exception {
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        checkUserEntity(user);

        Optional<WorkBook> workBook = workBookRepository.findByWnoAndWriterUno(work_book_id, user.get().getUno());
        checkWorkBookEntity(workBook);

        List<Work> workList = workRepository.findByWorkBookWno(work_book_id);
        Collections.shuffle(workList);

        return workList.stream().map(work -> entityToDto(work)).collect(Collectors.toList());
    }

    @Override
    public WorkResultRealResponseDTO selectWorkResult(List<WorkResultRequestDTO> result, String work_book_id) throws Exception {
        List<Work> work = workRepository.findByWorkBookWno(work_book_id);
        checkResultWork(work,result);

        Map<String, Work> resultCheck = new HashMap<>();
        for (Work w : work) {
            resultCheck.put(w.getQno(), w);
        }

        int score = 0;
        List<WorkResultResponseDTO> res = new ArrayList<>();
        for (WorkResultRequestDTO check : result) {
            Work value = resultCheck.get(check.getId());
            boolean workResult = false;
            if (value.getCorrect().equals(check.getCorrect())) {
                score++;
                workResult = true;
            }
            res.add(WorkResultResponseDTO.builder()
                    .question(value.getQuestion())
                    .answer_a(value.getAnswer_a())
                    .answer_b(value.getAnswer_b())
                    .answer_c(value.getAnswer_c())
                    .answer_d(value.getAnswer_d())
                    .answer_e(value.getAnswer_e())
                    .correct(value.getCorrect())
                    .explanation(value.getExplanation())
                    .choice(check.getCorrect())
                    .result(workResult).build());
        }
        WorkResultRealResponseDTO realRes = new WorkResultRealResponseDTO();
        realRes.setVal(res);
        realRes.setScore(score);
        realRes.setTotalScore(res.size());
        return realRes;
    }

    @Override
    public String deleteWork(String username, String work_book_id, String work_id) throws Exception {
        Optional<NePoolUser> user = userRepository.findByUsername(username);
        checkUserEntity(user);

        Optional<WorkBook> workBook = workBookRepository.findByWnoAndWriterUno(work_book_id, user.get().getUno());
        checkWorkBookEntity(workBook);

        Long check = workRepository.deleteByQnoAndWorkBookWno(work_id, work_book_id);
        checkDelete(check);

        return "삭제 완료";
    }

    @Override
    public WorkDTO updateWork(String username, String work_book_id, String work_id, WorkDTO dto) throws Exception {
        checkWorkDTO(dto);

        Optional<NePoolUser> user = userRepository.findByUsername(username);
        checkUserEntity(user);

        Optional<WorkBook> workBook = workBookRepository.findByWnoAndWriterUno(work_book_id, user.get().getUno());
        checkWorkBookEntity(workBook);

        Optional<Work> work = workRepository.findByQnoAndWorkBookWno(work_id, work_book_id);
        checkWorkEntity(work);

        work.get().updateWork(dto);

        return entityToDto(workRepository.save(work.get()));
    }
}
