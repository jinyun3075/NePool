package com.nepool.app.domain.comment.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CommentRequestDTO {
    private String id;
    private String content;
    private Long like;
    private String writer;
    private LocalDateTime regDate;
    private LocalDateTime modDate;
}
