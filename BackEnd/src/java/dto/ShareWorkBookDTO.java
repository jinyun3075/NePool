package com.NePool.app.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShareWorkBookDTO {
    private String work_book_id;
    private String user_id;
}
