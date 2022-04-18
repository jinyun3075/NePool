package com.NePool.app.exception;

import com.NePool.app.util.dto.ErrorResult;
import lombok.extern.log4j.Log4j2;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLException;

@Log4j2
@RestControllerAdvice
public class ErrorHandle {
    @ExceptionHandler
    public ErrorResult Handle(Exception e) {
        log.info("nat--------: "+e);
        if(e.getMessage()==null) {
            return new ErrorResult("402","null 값이 있네요 ㅡㅡ");
        }
        return new ErrorResult("500", e.getMessage());
    }
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ErrorResult Handle(SQLException  e) {
        log.info("sql-------: "+e);
        if(e.getErrorCode()==1062){
            if(e.getMessage().split(" ")[5].equals("'ne_pool_user.UK_khet4mrw3dpu8caytuwi3ibtj'")){
               return new ErrorResult("505", "중복 이름입니다.");
            }
            if(e.getMessage().split(" ")[5].equals("'ne_pool_user.UK_78djwcvlrdxnlhgt1k19jqha2'")){
                return new ErrorResult("505", "중복 아이디입니다.");
            }
            if(e.getMessage().split(" ")[5].equals("'ne_pool_user.UK_pnrrffcuwkrvavl8dqx8anukw'")){
                return new ErrorResult("505", "중복 이메일입니다.");
            }
        }
        if(e.getErrorCode()==1406) {
            return new ErrorResult("505","제목 혹은 문제가 너무 길어요");
        }
        return new ErrorResult("503", e.getMessage());
    }
}
