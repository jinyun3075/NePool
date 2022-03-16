package com.NePool.app.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentRequestDTO {
    private String id;
    private String content;
    private Long like;
    private String writer;
}
