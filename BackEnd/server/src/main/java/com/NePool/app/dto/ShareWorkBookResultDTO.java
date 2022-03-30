package com.NePool.app.dto;

import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.WorkBook;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShareWorkBookResultDTO {
    private WorkBook workBook;
    private NePoolUser nePoolUser;
}
