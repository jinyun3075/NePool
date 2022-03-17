package com.NePool.app.service;

import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.dto.UserDTO;
import com.NePool.app.entity.NePoolUser;

public interface UserService {
    UserDTO register(UserDTO dto) throws Exception;
    UserDTO getUser(String dto);
    PageResultDTO<UserDTO, NePoolUser> getList(PageRequestDTO dto);
    default NePoolUser dtoToEntity(UserDTO dto,String id) {
        return NePoolUser.builder()
                .uno(id)
                .name(dto.getName())
                .password(dto.getPassword())
                .email(dto.getEmail())
                .username(dto.getUsername()).build();
    }
    default UserDTO entityToDto(NePoolUser entity) {
        return UserDTO.builder()
                .id(entity.getUno())
                .name(entity.getName())
                .password(entity.getPassword())
                .email(entity.getEmail())
                .username(entity.getUsername()).build();
    }
}
