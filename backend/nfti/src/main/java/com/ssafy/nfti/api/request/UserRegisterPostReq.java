package com.ssafy.nfti.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
    @ApiModelProperty(name="유저 지갑주소", example="0xdf791410C4F64F20CA01025A73d2A0115353F360")
    String address;
    @ApiModelProperty(name = "유저 닉네임", example = "Guest_01010x0xx01")
    String nickname;
}
