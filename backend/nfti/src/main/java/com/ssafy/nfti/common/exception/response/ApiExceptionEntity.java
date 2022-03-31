package com.ssafy.nfti.common.exception.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ApiExceptionEntity {
    private String errorCode;
    private String errorMessage;

    @Builder
    public ApiExceptionEntity(String errorCode, String errorMessage){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}