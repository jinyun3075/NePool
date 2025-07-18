package com.nepool.app.domain.work.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WorkDTO {
    private String id;
    private String question;
    private String answer_a;
    private String answer_b;
    private String answer_c;
    private String answer_d;
    private String answer_e;
    private String correct;
    private String explanation;

}
