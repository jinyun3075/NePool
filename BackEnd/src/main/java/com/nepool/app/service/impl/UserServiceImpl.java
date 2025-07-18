package com.nepool.app.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.nepool.app.domain.user.dto.UserDTO;
import com.nepool.app.domain.user.entity.NePoolUser;
import com.nepool.app.domain.user.repository.UserRepository;
import com.nepool.app.service.UserService;
import com.nepool.app.util.dto.PageRequestDTO;
import com.nepool.app.util.dto.PageResultDTO;
import com.nepool.app.util.exception.ServiceExceptionCheck;
import com.nepool.app.util.module.BCryptModule;
import com.nepool.app.util.module.PageModule;

import java.util.Optional;
import java.util.function.Function;

@Service
@Log4j2
@RequiredArgsConstructor
public class UserServiceImpl extends ServiceExceptionCheck implements UserService {
    public final UserRepository userRepository;

    private final BCryptModule bCryptModule;

    private final PageModule pageModule;

    @Override
    public UserDTO insertUser(UserDTO dto) throws Exception {
        checkInsertUserDTO(dto);
        dto.setPassword(bCryptModule.encodePw(dto.getPassword()));
        NePoolUser res = userRepository.save(dtoToEntity(dto, bCryptModule.makeId()));
        return entityToDto(res);
    }

    @Override
    public UserDTO selectUser(String username) throws Exception {
        Optional<NePoolUser> entity = userRepository.findByUsername(username);
        checkUserEntity(entity);
        return entityToDto(entity.get());
    }

    @Override
    public PageResultDTO<UserDTO, NePoolUser> selectUserList(Integer page, Integer size) {
        PageRequestDTO pageRequestDTO = pageModule.makePage(page, size);
        Page<NePoolUser> entity = userRepository.findAll(pageRequestDTO.getPageable(Sort.by("uno").ascending()));
        Function<NePoolUser, UserDTO> fn = (data -> entityToDto(data));
        return new PageResultDTO<>(entity, fn);
    }

    @Override
    public UserDTO updateUser(UserDTO dto) throws Exception {
        checkUpdateUserDTO(dto);

        Optional<NePoolUser> entity = userRepository.findById(dto.getId());
        checkUserEntity(entity);

        bCryptModule.matchesPw(dto.getPassword(), entity.get().getPassword());

        entity.get().update(dto.getName(), dto.getImage());
        return entityToDto(userRepository.save(entity.get()));
    }

    @Override
    public String deleteUser(String user_id) throws Exception {
        Optional<NePoolUser> entity = userRepository.findById(user_id);
        checkUserEntity(entity);
        userRepository.deleteById(user_id);
        return "삭제 완료";
    }
}
