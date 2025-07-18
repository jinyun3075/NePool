package com.nepool.app.service;

import java.util.List;

import com.nepool.app.domain.work.dto.WorkDTO;
import com.nepool.app.domain.work.dto.WorkResultRealResponseDTO;
import com.nepool.app.domain.work.dto.WorkResultRequestDTO;
import com.nepool.app.domain.work.entity.Work;
import com.nepool.app.domain.workbook.entity.WorkBook;

public interface WorkService {
    WorkDTO insertWork(WorkDTO dto, String username, String work_book_id) throws Exception;

    WorkDTO selectWork(String username, String work_book_id, String work_id) throws Exception;

    List<WorkDTO> selectWorkList(String username, String work_book_id) throws Exception;

    WorkResultRealResponseDTO selectWorkResult(List<WorkResultRequestDTO> result, String work_id) throws Exception;

    String deleteWork(String username, String work_book_id, String work_id) throws Exception;

    WorkDTO updateWork(String username, String work_book_id, String work_id, WorkDTO dto) throws Exception;

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
