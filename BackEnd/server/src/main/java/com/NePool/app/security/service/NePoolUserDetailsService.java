package com.NePool.app.security.service;

import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.UserRole;
import com.NePool.app.repository.UserRepository;
import com.NePool.app.security.dto.NePoolAuthDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class NePoolUserDetailsService implements UserDetailsService {

    private final UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        List<NePoolUser> result = repository.findByUsername(username);

        if(result.size()==0) {
            throw new UsernameNotFoundException("Check username");
        }
        NePoolUser nePoolUser = result.get(0);

        HashSet<UserRole> set = new HashSet<>();
        set.add(UserRole.USER);
        set.add(UserRole.ADMIN);
        NePoolAuthDTO nePoolAuthDTO = new NePoolAuthDTO(
                nePoolUser.getUsername(),
                nePoolUser.getPassword(),
                set.stream().map(role -> new SimpleGrantedAuthority("ROLE_"+role.name())).collect(Collectors.toList())
        );

        nePoolAuthDTO.setName(nePoolUser.getName());
        nePoolAuthDTO.setEmail(nePoolUser.getEmail());

        return nePoolAuthDTO;
    }
}
