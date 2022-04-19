package com.NePool.app.dto;

import com.NePool.app.entity.NePoolUser;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShareWorkBookResultDTO {
    private WorkBookRequestDTO workBook;
    private UserDTO user;
}
