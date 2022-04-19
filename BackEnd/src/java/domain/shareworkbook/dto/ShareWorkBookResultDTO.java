package com.NePool.app.domain.shareworkbook.dto;

import com.NePool.app.domain.user.dto.UserDTO;
import com.NePool.app.domain.workbook.dto.WorkBookRequestDTO;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShareWorkBookResultDTO {
    private WorkBookRequestDTO workBook;
    private UserDTO user;
}
