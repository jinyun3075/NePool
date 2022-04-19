package com.NePool.app.util.dto;

import com.NePool.app.domain.user.dto.UserDTO;
import com.NePool.app.domain.workbook.dto.WorkBookRequestDTO;
import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class SearchDTO {
    private List<WorkBookRequestDTO> workBook;
    private List<UserDTO> user;
}
