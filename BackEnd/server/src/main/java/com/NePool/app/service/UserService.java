package com.NePool.app.service;

import com.NePool.app.util.dto.PageRequestDTO;
import com.NePool.app.util.dto.PageResultDTO;
import com.NePool.app.domain.user.dto.UserDTO;
import com.NePool.app.domain.user.dto.UserLoginDTO;
import com.NePool.app.domain.user.entity.NePoolUser;
import com.nimbusds.jose.shaded.json.JSONObject;

public interface UserService {
    UserDTO insertUser(UserDTO dto) throws Exception;

    UserDTO selectUser(String dto);

    PageResultDTO<UserDTO, NePoolUser> selectUserList(Integer page, Integer size);

    UserDTO updateUser(UserDTO dto) throws Exception;

    String deleteUser(String user_id) throws Exception;

    UserLoginDTO googleLogin(JSONObject dto) throws Exception;

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
