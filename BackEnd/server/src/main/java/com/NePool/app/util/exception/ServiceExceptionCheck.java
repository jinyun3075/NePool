package com.NePool.app.util.exception;

import com.NePool.app.domain.announcement.entity.Announcement;
import com.NePool.app.domain.comment.dto.CommentRequestDTO;
import com.NePool.app.domain.comment.entity.Comment;
import com.NePool.app.domain.shareworkbook.entity.ShareWorkBook;
import com.NePool.app.domain.user.dto.UserDTO;
import com.NePool.app.domain.user.entity.NePoolUser;
import com.NePool.app.domain.work.dto.WorkDTO;
import com.NePool.app.domain.work.dto.WorkResultRequestDTO;
import com.NePool.app.domain.work.entity.Work;
import com.NePool.app.domain.workbook.dto.WorkBookRequestDTO;
import com.NePool.app.domain.workbook.entity.WorkBook;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

public class ServiceExceptionCheck {
    public void checkCommentDTO(CommentRequestDTO dto) throws Exception {
        if (dto.getContent().equals("")) {
            throw new Exception("내용을 입력해 주세요");
        }
    }

    public void checkCommentEntity(Page<Comment> page) throws Exception{
        if (page.getTotalElements() == 0) {
            throw new Exception("리뷰가 없습니다.");
        }
    }

    public void checkCommentEntity(Optional<Comment> entity) throws Exception {
        if (!entity.isPresent()) {
            throw new Exception("존재하지 않는 리뷰입니다.");
        }
    }

    public void checkInsertUserDTO(UserDTO dto) throws Exception {
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
    }


    public void checkUpdateUserDTO(UserDTO dto) throws Exception {
        if (dto.getName().equals("")) {
            throw new Exception("이름을 입력해주세요");
        }
    }

    public void checkUserEntity(Optional<NePoolUser> entity) throws Exception {
        if (!entity.isPresent()) {
            throw new Exception("존재하지 않는 아이디입니다.");
        }
    }

    public void checkWorkBookDTO(WorkBookRequestDTO dto) throws Exception {
        if (dto.getTitle().equals("") || dto.getContent().equals("") || dto.getType().equals("")) {
            throw new Exception("제목,설명, 타입 을 입력해주세요.");
        }
    }

    public void checkWorkBookEntity(Optional<WorkBook> entity) throws Exception {
        if (!entity.isPresent()) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
    }

    public void checkShareWorkBookOverlap(Optional<ShareWorkBook> entity) throws Exception {
        if (entity.isPresent()) {
            throw new Exception("이미 스크랩했습니다.");
        }
    }

    public void checkWorkDTO(WorkDTO dto) throws Exception {
        if (dto.getAnswer_a().equals("")
                || dto.getAnswer_b().equals("")
                || dto.getAnswer_c().equals("")
                || dto.getAnswer_d().equals("")
                || dto.getAnswer_e().equals("")
                || dto.getQuestion().equals("")
                || dto.getCorrect().equals("")) {
            throw new Exception("모든 요구사항을 입력해주세요.");
        }
    }

    public void checkWorkEntity(Optional<Work> entity) throws Exception {
        if (!entity.isPresent()) {
            throw new Exception("존재하지 않는 문제입니다.");
        }
    }

    public void checkResultWork(List<Work> work, List<WorkResultRequestDTO> result) throws Exception {
        if (work.size() == 0) {
            throw new Exception("존재하지 않는 문제집입니다.");
        }
        if (result.size() != work.size()) {
            throw new Exception("존재하는 문제 수에 맞게 데이터를 보내주세요.");
        }
    }

    public void checkAnnouncement(Optional<Announcement> entity) throws Exception {
        if (!entity.isPresent()) {
            throw new Exception("없는 id 값 입니다.");
        }
    }

    public void checkDelete(Long check) throws Exception {
        if (check == 0) {
            throw new Exception("존재하지 않는 문제집 혹은 문제입니다.");
        }
    }

}
