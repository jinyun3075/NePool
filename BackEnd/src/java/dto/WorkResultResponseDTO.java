package com.NePool.app.domain.work.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WorkResultResponseDTO {
    private String question;
    private String answer_a;
    private String answer_b;
    private String answer_c;
    private String answer_d;
    private String answer_e;
    private String correct;
    private String choice;
    private String explanation;
    private boolean result;
}