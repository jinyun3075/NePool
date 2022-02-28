package com.NePool.app.service;

import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.dto.UserDTO;
import com.NePool.app.entity.User;

public interface UserService {
    UserDTO register(UserDTO dto);
    PageResultDTO<UserDTO,User> getList(PageRequestDTO dto);

    default User dtoToEntity(UserDTO dto) {
        return User.builder()
                .name(dto.getName())
                .password(dto.getPassword())
                .email(dto.getEmail())
                .dept(dto.getDept())
                .user_id(dto.getId()).build();
    }
    default UserDTO entityToDto(User entity) {
        return UserDTO.builder()
                .name(entity.getName())
                .password(entity.getPassword())
                .email(entity.getEmail())
                .dept(entity.getDept())
                .id(entity.getUser_id()).build();
    }
}
