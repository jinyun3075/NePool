package com.NePool.app.exception;

import com.NePool.app.dto.ErrorResult;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Log4j2
@RestControllerAdvice
public class ErrorHandle {
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler
    public ErrorResult Handle(Exception e) {
        log.info("----------------");
        log.info(e);
        return new ErrorResult("500", e.getMessage());
    }
}
