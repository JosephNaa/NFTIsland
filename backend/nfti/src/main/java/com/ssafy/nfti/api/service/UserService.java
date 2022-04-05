package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.UserRegisterPostReq;
import com.ssafy.nfti.api.request.UserReq;
import com.ssafy.nfti.api.request.UserUpdateReq;
import com.ssafy.nfti.api.response.UserRes;
import com.ssafy.nfti.db.entity.User;

public interface UserService {

    // 인터페이스 만들고  메서드 UserServiceImpl에서
    User getUserOrCreateUser(String address);

    User getUserInfo(String findBy, String search);

    UserRes updateNickname(String address, UserUpdateReq req);

    UserRes updateProfilePath(String address, UserReq req, String url);

    //UserRepository 만들기

    String getUserByCommunityId(Long communityId);
}
