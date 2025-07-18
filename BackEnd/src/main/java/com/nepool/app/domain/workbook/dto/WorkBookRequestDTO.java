package com.nepool.app.domain.workbook.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class WorkBookRequestDTO {
    private String id;
    private String title;
    private String content;
    private String image;
    private Boolean share;
    private String username;
    private Long count;
    private String type;
    private LocalDateTime regDate;
    private LocalDateTime modDate;
}
