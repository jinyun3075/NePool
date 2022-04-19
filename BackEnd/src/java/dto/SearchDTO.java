package com.NePool.app.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class SearchDTO {
    private List<WorkBookRequestDTO> workBook;
    private List<UserDTO> user;
}
