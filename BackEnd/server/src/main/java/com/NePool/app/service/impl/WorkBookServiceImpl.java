package com.NePool.app.service.impl;

import com.NePool.app.dto.WorkBookRequestDTO;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.WorkBook;
import com.NePool.app.repository.UserRepository;
import com.NePool.app.repository.WorkBookRepository;
import com.NePool.app.service.WorkBookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class WorkBookServiceImpl implements WorkBookService {
    public final WorkBookRepository repository;
    public final UserRepository userRepository;
    @Override
    public WorkBookRequestDTO register(WorkBookRequestDTO dto) {
        Optional<NePoolUser> user = userRepository.findByUsername(dto.getUsername());
        if(!user.isPresent()) {
            throw new UsernameNotFoundException("Check username");
        }
        WorkBook res = repository.save(dtoToEntity(dto,user.get()));
        return entityToDto(res);
    }
}
