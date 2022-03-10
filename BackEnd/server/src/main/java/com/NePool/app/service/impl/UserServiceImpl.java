package com.NePool.app.service.impl;

import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.dto.UserDTO;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.repository.UserRepository;
import com.NePool.app.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.regex.Pattern;

@Service
@Log4j2
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    public final UserRepository repository;
    @Autowired
    private PasswordEncoder pw;
    @Override
    public UserDTO register(UserDTO dto) throws Exception {
        if(dto.getName().equals("")||dto.getUsername().equals("")||dto.getEmail().equals("")||dto.getPassword().equals("")){
            throw new Exception("모든 요구사항을 입력해주세요.");
        }
        if(!(dto.getPassword().length()>5&dto.getPassword().length()<15)) {
            throw new Exception("비밀번호는 6자 이상 15자 이하로 입력해주세요.");
        }
        String passwordPattern = "[a-z0-9ㄱ-ㅎ가-힣\\\\!\\\\@\\\\#]*";
        if(!Pattern.matches(passwordPattern,dto.getPassword())) {
            throw new Exception("영문 및 숫자 @,!,# 로만 입력해주세요");
        }
        String emailPattern = "^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-z]+$";
        if(!Pattern.matches(emailPattern,dto.getEmail())) {
            throw new Exception("이메일 형식이 아닙니다.");
        }
        dto.setPassword(pw.encode(dto.getPassword()));
        NePoolUser res = repository.save(dtoToEntity(dto));
        return entityToDto(res);
    }

    @Override
    public UserDTO getUser(String username) {
        Optional<NePoolUser> entity = repository.findByUsername(username);
        return entityToDto(entity.get());
    }

    @Override
    public PageResultDTO<UserDTO, NePoolUser> getList(PageRequestDTO dto) {
        Page<NePoolUser> entity = repository.findAll(dto.getPageable(Sort.by("uno").ascending()));
        Function<NePoolUser,UserDTO> fn = (data -> entityToDto(data));
        return new PageResultDTO<>(entity, fn);
    }
}
