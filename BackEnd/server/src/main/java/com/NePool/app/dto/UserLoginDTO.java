package com.NePool.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginDTO {
    private String id;
    private String username;
    private String name;
    private String Token;
    private String email;
}
