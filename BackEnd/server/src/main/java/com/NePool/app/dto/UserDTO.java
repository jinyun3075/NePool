package com.NePool.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDTO {
    private String id;
    private String username;
    private String name;
    private String email;
    private String password;
}
