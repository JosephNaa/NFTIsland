package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.UserRegisterPostReq;
import com.ssafy.nfti.api.response.UserRes;
import com.ssafy.nfti.db.entity.User;

public interface UserService {

    // 인터페이스 만들고  메서드 UserServiceImpl에서 만들기
    User getUserByAddress(String address);
    UserRes updateNickname(String address, String nickname);


    //UserRepository 만들기

    String getUserByCommunityId(Long communityId);
}
