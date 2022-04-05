package com.ssafy.nfti.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserUpdateReq")
public class UserUpdateReq {
    String nickname;
}
