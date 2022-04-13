package com.NePool.app.service.impl;

import com.NePool.app.util.dto.PageRequestDTO;
import com.NePool.app.util.dto.PageResultDTO;
import com.NePool.app.domain.user.dto.UserDTO;
import com.NePool.app.domain.user.dto.UserLoginDTO;
import com.NePool.app.domain.user.entity.NePoolUser;
import com.NePool.app.domain.user.repository.UserRepository;
import com.NePool.app.util.jwt.JWTUtil;
import com.NePool.app.service.UserService;
import com.nimbusds.jose.shaded.json.JSONObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;
import java.util.function.Function;
import java.util.regex.Pattern;

@Service
@Log4j2
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    public final UserRepository repository;

    @Autowired
    private Random random;

    @Autowired
    private PasswordEncoder pw;

    @Override
    public UserDTO insertUser(UserDTO dto) throws Exception {
        if (dto.getName().equals("") || dto.getUsername().equals("") || dto.getEmail().equals("") || dto.getPassword().equals("")) {
            throw new Exception("모든 요구사항을 입력해주세요.");
        }
        if (!(dto.getPassword().length() > 5 & dto.getPassword().length() < 15)) {
            throw new Exception("비밀번호는 6자 이상 15자 이하로 입력해주세요.");
        }
        String passwordPattern = "[a-z0-9ㄱ-ㅎ가-힣\\\\!\\\\@\\\\#]*";
        if (!Pattern.matches(passwordPattern, dto.getPassword())) {
            throw new Exception("영문 및 숫자 @,!,# 로만 입력해주세요");
        }
        String emailPattern = "^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-z]+$";
        if (!Pattern.matches(emailPattern, dto.getEmail())) {
            throw new Exception("이메일 형식이 아닙니다.");
        }
        dto.setPassword(pw.encode(dto.getPassword()));
        NePoolUser res = repository.save(dtoToEntity(dto, (pw.encode(random.nextInt(600) + "").replace("/", ""))));
        return entityToDto(res);
    }

    @Override
    public UserDTO selectUser(String username) {
        Optional<NePoolUser> entity = repository.findByUsername(username);
        return entityToDto(entity.get());
    }

    @Override
    public PageResultDTO<UserDTO, NePoolUser> selectUserList(PageRequestDTO dto) {
        Page<NePoolUser> entity = repository.findAll(dto.getPageable(Sort.by("uno").ascending()));
        Function<NePoolUser, UserDTO> fn = (data -> entityToDto(data));
        return new PageResultDTO<>(entity, fn);
    }

    @Override
    public UserDTO updateUser(UserDTO dto) throws Exception {
        if (dto.getName().equals("")) {
            throw new Exception("이름을 입력해주세요");
        }
        Optional<NePoolUser> entity = repository.findById(dto.getId());
        if (!entity.isPresent()) {
            throw new Exception("존재하지 않는 ID입니다.");
        }
        log.info(pw.matches(dto.getPassword(), entity.get().getPassword()));
        if (pw.matches(dto.getPassword(), entity.get().getPassword())) {
            entity.get().update(dto.getName(), dto.getImage());
            return entityToDto(repository.save(entity.get()));
        }
        throw new Exception("Password 가 틀립니다.");
    }

    @Override
    public String deleteUser(String user_id) throws Exception {
        Optional<NePoolUser> entity = repository.findById(user_id);
        if (!entity.isPresent()) {
            throw new Exception("존재하지 않는 ID입니다.");
        }
        repository.deleteById(user_id);
        return "삭제 완료";
    }

    @Override
    public UserLoginDTO googleLogin(JSONObject dto) throws Exception {
        Optional<NePoolUser> entity = repository.findById(dto.getAsString("sub"));
        JWTUtil jwtUtil = new JWTUtil();
        if (!entity.isPresent()) {

            NePoolUser nePoolUser = repository.save(
                    NePoolUser.builder()
                            .uno(dto.getAsString("sub"))
                            .username(dto.getAsString("email"))
                            .name(dto.getAsString("name"))
                            .password(pw.encode("nepool"))
                            .email(dto.getAsString("email"))
                            .image("")
                            .build()
            );
            return UserLoginDTO.builder()
                    .id(nePoolUser.getUno())
                    .username(nePoolUser.getUsername())
                    .email(nePoolUser.getEmail())
                    .name(nePoolUser.getName())
                    .Token(jwtUtil.generateToken("123"))
                    .build();
        }

        return UserLoginDTO.builder()
                .id(entity.get().getUno())
                .username(entity.get().getUsername())
                .email(entity.get().getEmail())
                .name(entity.get().getName())
                .Token(jwtUtil.generateToken("123"))
                .build();
    }
}
