package com.NePool.app.service;

import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.dto.UserDTO;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@Log4j2
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    public final UserRepository repository;
    @Override
    public UserDTO register(UserDTO dto) throws Exception {
        if(dto.getName().equals("")||dto.getUsername().equals("")||dto.getEmail().equals("")||dto.getPassword().equals("")){
            throw new Exception("모든 요구사항을 입력해주세요.");
        }
        if(!(dto.getPassword().length()>6&dto.getPassword().length()<15)) {
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
        NePoolUser res = repository.save(dtoToEntity(dto));
        return entityToDto(res);
    }
    @Override
    public PageResultDTO<UserDTO, NePoolUser> getList(PageRequestDTO dto) {
        return null;
    }
}
