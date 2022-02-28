package com.NePool.app.service;

import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.dto.UserDTO;
import com.NePool.app.entity.User;
import com.NePool.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    public final UserRepository repository;
    @Override
    public UserDTO register(UserDTO dto) {
        User res = repository.save(dtoToEntity(dto));
        return entityToDto(res);
    }

    @Override
    public PageResultDTO<UserDTO, User> getList(PageRequestDTO dto) {
        return null;
    }
}
