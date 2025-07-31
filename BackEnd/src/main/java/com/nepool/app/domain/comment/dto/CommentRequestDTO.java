package com.nepool.app.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequestDTO {
    private String id;
    private String content;
    private Long like;
    private String writer;
    private LocalDateTime regDate;
    private LocalDateTime modDate;
}
