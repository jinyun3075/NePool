package com.NePool.app.service;

import com.NePool.app.dto.WorkDTO;
import com.NePool.app.entity.Work;
import com.NePool.app.entity.WorkBook;

public interface WorkService {
    WorkDTO register(WorkDTO dto, String username, Long work_book_id) throws Exception;

    default Work dtoToEntity(WorkDTO dto, WorkBook workBook) {
        return Work.builder()
                .question(dto.getQuestion())
                .answer_a(dto.getAnswer_a())
                .answer_b(dto.getAnswer_b())
                .answer_c(dto.getAnswer_c())
                .answer_d(dto.getAnswer_d())
                .answer_e(dto.getAnswer_e())
                .correct(dto.getCorrect())
                .workBook(workBook)
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
                .correct(entity.getCorrect()).build();
    }
}
