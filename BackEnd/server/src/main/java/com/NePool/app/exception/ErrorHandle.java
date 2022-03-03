package com.NePool.app.exception;

import com.NePool.app.dto.ErrorResult;
import lombok.extern.log4j.Log4j2;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLDataException;
import java.sql.SQLException;

@Log4j2
@RestControllerAdvice
public class ErrorHandle {
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler
    public ErrorResult Handle(Exception e) {
        return new ErrorResult("500", e.getMessage());
    }
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ErrorResult Handle(SQLException  e) {
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
        return new ErrorResult("503", e.getMessage());
    }
}
