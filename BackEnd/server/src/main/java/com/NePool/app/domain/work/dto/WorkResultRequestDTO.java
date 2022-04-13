package com.NePool.app.domain.work.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;


@Data
@Builder
public class WorkResultRequestDTO {
    private String id;
    private String correct;

}
