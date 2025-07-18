package com.nepool.app.security.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nepool.app.domain.user.entity.NePoolUser;
import com.nepool.app.domain.user.repository.UserRepository;
import com.nepool.app.security.dto.NePoolAuthDTO;
import com.nepool.app.util.entity.UserRole;

import java.util.HashSet;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class NePoolUserDetailsService implements UserDetailsService {

    private final UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<NePoolUser> result = repository.findByUsername(username);

        if(!result.isPresent()) {
            throw new UsernameNotFoundException("Check username");
        }
        NePoolUser nePoolUser = result.get();

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
        nePoolAuthDTO.setId(nePoolUser.getUno());

        return nePoolAuthDTO;
    }
}
