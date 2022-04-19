package com.NePool.app.domain.user.dto;

import lombok.Data;

@Data
public class UserLoginRequestDTO {
    private String username;
    private String password;
}
