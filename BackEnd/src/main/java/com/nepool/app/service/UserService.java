package com.nepool.app.service;

import com.nepool.app.domain.user.dto.UserDTO;
import com.nepool.app.domain.user.dto.UserLoginDTO;
import com.nepool.app.domain.user.entity.NePoolUser;
import com.nepool.app.util.dto.PageRequestDTO;
import com.nepool.app.util.dto.PageResultDTO;


public interface UserService {
    UserDTO insertUser(UserDTO dto) throws Exception;

    UserDTO selectUser(String dto) throws Exception;

    PageResultDTO<UserDTO, NePoolUser> selectUserList(Integer page, Integer size);

    UserDTO updateUser(UserDTO dto) throws Exception;

    String deleteUser(String user_id) throws Exception;

    default NePoolUser dtoToEntity(UserDTO dto, String id) {
        return NePoolUser.builder()
                .uno(id)
                .name(dto.getName())
                .password(dto.getPassword())
                .email(dto.getEmail())
                .username(dto.getUsername())
                .image(dto.getImage())
                .build();
    }

    default UserDTO entityToDto(NePoolUser entity) {
        return UserDTO.builder()
                .id(entity.getUno())
                .name(entity.getName())
                .password(entity.getPassword())
                .email(entity.getEmail())
                .username(entity.getUsername())
                .image(entity.getImage())
                .build();
    }
}
