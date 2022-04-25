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
    public WorkDTO insertWork(WorkDTO dto, String username, String work_book_id) throws Exception {
        if (dto.getAnswer_a().equals("") || dto.getAnswer_b().equals("") || dto.getAnswer_c().equals("") || dto.getAnswer_d().equals("") || dto.getAnswer_e().equals("") || dto.getQuestion().equals("") || dto.getCorrect().equals("")) {
            throw new Exception("모든 요구사항을 입력해주세요.");
        }
        WorkBook workBook = check(username, work_book_id);
        return entityToDto(workRepository.save(dtoToEntity(dto, workBook, pw.encode(random.nextInt(600) + "").replace("/", ""))));
    }

    @Override
    public WorkDTO selectWork(String username, String work_book_id, String work_id) throws Exception {
        check(username, work_book_id);
        Optional<Work> work = workRepository.findByQnoAndWorkBookWno(work_id, work_book_id);
        if (!work.isPresent()) {
            throw new Exception("존재하지 않는 문제입니다.");
        }
        return entityToDto(work.get());
    }

    @Override
    public List<WorkDTO> selectWorkList(String username, String work_book_id) throws Exception {
        check(username, work_book_id);
        List<Work> res = workRepository.findByWorkBookWno(work_book_id);
        Collections.shuffle(res);
        return res.stream().map(work -> entityToDto(work)).collect(Collectors.toList());
    }

    @Override
    public WorkResultRealResponseDTO selectWorkResult(List<WorkResultRequestDTO> result, String work_book_id) throws Exception {
        List<Work> work = workRepository.findByWorkBookWno(work_book_id);
        if (work.size() == 0) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
        if (result.size() != work.size()) {
            throw new Exception("존재하는 문제 수에 맞게 데이터를 보내주세요.");
        }

        Map<String, Work> map = new HashMap<>();
        for (Work w : work) {
            map.put(w.getQno(), w);
        }
        int score = 0;
        List<WorkResultResponseDTO> res = new ArrayList<>();
        for (WorkResultRequestDTO check : result) {
            Work value = map.get(check.getId());
            boolean bool = false;
            if (value.getCorrect().equals(check.getCorrect())) {
                score++;
                bool = true;
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
                    .result(bool).build());
        }
        WorkResultRealResponseDTO realRes = new WorkResultRealResponseDTO();
        realRes.setVal(res);
        realRes.setScore(score);
        realRes.setTotalScore(res.size());
        return realRes;
    }

    @Override
    public String deleteWork(String username, String work_book_id, String work_id) throws Exception {
        check(username, work_book_id);
        Long res = workRepository.deleteByQnoAndWorkBookWno(work_id, work_book_id);
        if (res == 0) {
            throw new Exception("존재하지 않는 문제입니다.");
        }
        return "삭제 완료";
    }

    @Override
    public WorkDTO updateWork(String username, String work_book_id, String work_id, WorkDTO dto) throws Exception {
        check(username, work_book_id);
        Optional<Work> work = workRepository.findByQnoAndWorkBookWno(work_id, work_book_id);
        if (!work.isPresent()) {
            throw new Exception("존재하지 않는 문제입니다.");
        }
        work.get().updateWork(dto);
        return entityToDto(workRepository.save(work.get()));
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
