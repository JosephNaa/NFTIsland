package com.ssafy.nfti.common.exception.handler;

import com.ssafy.nfti.common.exception.enums.ExceptionEnum;
import com.ssafy.nfti.common.exception.response.ApiException;
import com.ssafy.nfti.common.exception.response.ApiExceptionEntity;
import javax.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionAdvice {
    @ExceptionHandler({ApiException.class})
    public ResponseEntity<ApiExceptionEntity> exceptionHandler(HttpServletRequest request, final ApiException e) {
        e.printStackTrace();
        return ResponseEntity
            .status(e.getError().getStatus())
            .body(ApiExceptionEntity.builder()
                .errorCode(e.getError().getCode())
                .errorMessage(e.getError().getMessage())
                .build());
    }

    @ExceptionHandler({RuntimeException.class})
    public ResponseEntity<ApiExceptionEntity> exceptionHandler(HttpServletRequest request, final RuntimeException e) {
        e.printStackTrace();
        return ResponseEntity
            .status(ExceptionEnum.RUNTIME_EXCEPTION.getStatus())
            .body(ApiExceptionEntity.builder()
                .errorCode(ExceptionEnum.RUNTIME_EXCEPTION.getCode())
                .errorMessage(e.getMessage())
                .build());
    }

    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<ApiExceptionEntity> exceptionHandler(HttpServletRequest request, final AccessDeniedException e) {
        e.printStackTrace();
        return ResponseEntity
            .status(ExceptionEnum.ACCESS_DENIED_EXCEPTION.getStatus())
            .body(ApiExceptionEntity.builder()
                .errorCode(ExceptionEnum.ACCESS_DENIED_EXCEPTION.getCode())
                .errorMessage(e.getMessage())
                .build());
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ApiExceptionEntity> exceptionHandler(HttpServletRequest request, final Exception e) {
        e.printStackTrace();
        return ResponseEntity
            .status(ExceptionEnum.INTERNAL_SERVER_ERROR.getStatus())
            .body(ApiExceptionEntity.builder()
                .errorCode(ExceptionEnum.INTERNAL_SERVER_ERROR.getCode())
                .errorMessage(e.getMessage())
                .build());
    }
}