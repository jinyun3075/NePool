package com.nepool.app.domain.workbook.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
