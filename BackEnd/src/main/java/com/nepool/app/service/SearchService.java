package com.nepool.app.service;

import com.nepool.app.domain.user.dto.UserDTO;
import com.nepool.app.domain.user.entity.NePoolUser;
import com.nepool.app.domain.workbook.dto.WorkBookRequestDTO;
import com.nepool.app.domain.workbook.entity.WorkBook;
import com.nepool.app.util.dto.SearchDTO;

public interface SearchService {

    SearchDTO selectUserAndWorkBook(String keyword);
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
