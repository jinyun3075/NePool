package com.NePool.app.service;

import com.NePool.app.dto.SearchDTO;
import com.NePool.app.dto.UserDTO;
import com.NePool.app.dto.WorkBookRequestDTO;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.WorkBook;

public interface SearchService {

    SearchDTO search(String keyword);
    default UserDTO userEntityToDto(NePoolUser entity) {
        return UserDTO.builder()
                .id(entity.getUno())
                .name(entity.getName())
                .password(entity.getPassword())
                .email(entity.getEmail())
                .username(entity.getUsername()).build();
    }
    default WorkBookRequestDTO workBookEntityToDto(WorkBook entity) {
        return WorkBookRequestDTO.builder()
                .title(entity.getTitle())
                .content(entity.getContent())
                .username(entity.getWriter().getUsername())
                .id(entity.getWno())
                .count(entity.getCount())
                .type(entity.getType())
                .share(entity.getShare())
                .regDate(entity.getRegDate())
                .modDate(entity.getModDate())
                .build();
    }
}
