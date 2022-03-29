package com.ssafy.nfti.api.response;


import com.ssafy.nfti.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes {

    @ApiModelProperty(name="address", value = "")
    String address;

    @ApiModelProperty(name="Nickname")
    String nickname;

    @ApiModelProperty(name="Profile Image")
    String profile_path;


    public static UserRes of(User user) {
        UserRes res = new UserRes();
        res.setAddress(user.getAddress());
        res.setNickname(user.getNickname());
        res.setProfile_path(user.getProfile_path());
        return res;
    }
}
