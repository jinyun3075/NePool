package com.nepool.app.util.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

import com.nepool.app.domain.user.dto.UserDTO;
import com.nepool.app.domain.workbook.dto.WorkBookRequestDTO;

@Data
@Builder
public class SearchDTO {
    private List<WorkBookRequestDTO> workBook;
    private List<UserDTO> user;
}
