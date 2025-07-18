package com.nepool.app.domain.work.dto;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class WorkResultRequestDTO {
    private String id;
    private String correct;

}
