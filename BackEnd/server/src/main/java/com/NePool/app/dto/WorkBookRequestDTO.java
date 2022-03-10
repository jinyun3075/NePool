package com.NePool.app.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WorkBookRequestDTO {
    private Long id;
    private String title;
    private String content;
    private Boolean share;
    private String username;
}
