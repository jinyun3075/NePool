package com.NePool.app.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;


@Data
@Builder
public class WorkResultRequestDTO {
    private String id;
    private String correct;

}
