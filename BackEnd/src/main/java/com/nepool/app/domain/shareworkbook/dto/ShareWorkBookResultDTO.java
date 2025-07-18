package com.nepool.app.domain.shareworkbook.dto;

import com.nepool.app.domain.user.dto.UserDTO;
import com.nepool.app.domain.workbook.dto.WorkBookRequestDTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShareWorkBookResultDTO {
    private WorkBookRequestDTO workBook;
    private UserDTO user;
}
