package com.NePool.app.security.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
@Setter
@ToString
public class NePoolAuthDTO extends User {
    private String id;
    private String username;
    private String name;
    private String email;
    private String token;

    public NePoolAuthDTO(
            String username,
            String password,
            Collection<? extends GrantedAuthority> authorities) {
                super(username,password,authorities);
                this.username=username;
    }

}
