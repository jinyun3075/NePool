package com.NePool.app.service;

import com.NePool.app.dto.WorkDTO;
import com.NePool.app.dto.WorkResultRealResponseDTO;
import com.NePool.app.dto.WorkResultRequestDTO;
import com.NePool.app.dto.WorkResultResponseDTO;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.Work;
import com.NePool.app.entity.WorkBook;

import java.util.List;

public interface WorkService {
    WorkDTO register(WorkDTO dto, String username, String work_book_id) throws Exception;

    WorkDTO getWork(String username, String work_book_id, String work_id) throws Exception;

    List<WorkDTO> getList(String username, String work_book_id) throws Exception;

    WorkResultRealResponseDTO checkResult(List<WorkResultRequestDTO> result, String work_id) throws Exception;

    void delete(String username, String work_book_id, String work_id) throws Exception;

    WorkDTO update(String username, String work_book_id, String work_id, WorkDTO dto) throws Exception;

    default Work dtoToEntity(WorkDTO dto, WorkBook workBook, String id) {
        return Work.builder()
                .qno(id)
                .question(dto.getQuestion())
                .answer_a(dto.getAnswer_a())
                .answer_b(dto.getAnswer_b())
                .answer_c(dto.getAnswer_c())
                .answer_d(dto.getAnswer_d())
                .answer_e(dto.getAnswer_e())
                .correct(dto.getCorrect())
                .workBook(workBook)
                .explanation(dto.getExplanation())
                .build();
    }

    default WorkDTO entityToDto(Work entity) {
        return WorkDTO.builder()
                .id(entity.getQno())
                .question(entity.getQuestion())
                .answer_a(entity.getAnswer_a())
                .answer_b(entity.getAnswer_b())
                .answer_c(entity.getAnswer_c())
                .answer_d(entity.getAnswer_d())
                .answer_e(entity.getAnswer_e())
                .explanation(entity.getExplanation())
                .correct(entity.getCorrect()).build();
    }
}
