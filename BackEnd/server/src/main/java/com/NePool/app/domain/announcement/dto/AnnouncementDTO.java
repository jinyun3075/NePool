package com.NePool.app.domain.announcement.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
public class AnnouncementDTO implements Serializable {
    private final Long id;
    private final String title;
    private final String contents;
    private final LocalDateTime regDate;
    private final LocalDateTime modDate;
}
