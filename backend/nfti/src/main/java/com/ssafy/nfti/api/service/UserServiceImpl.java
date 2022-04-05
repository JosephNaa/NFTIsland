package com.ssafy.nfti.api.service;


import com.ssafy.nfti.api.request.UserReq;
import com.ssafy.nfti.api.request.UserUpdateReq;
import com.ssafy.nfti.api.response.UserRes;
import com.ssafy.nfti.common.exception.enums.ExceptionEnum;
import com.ssafy.nfti.common.exception.response.ApiException;
import com.ssafy.nfti.db.entity.User;
import com.ssafy.nfti.db.repository.CommunityRepository;
import com.ssafy.nfti.db.repository.UserRepository;
import com.ssafy.nfti.db.repository.UserRepositorySupport;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CommunityRepository communityRepository;

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Override
    public User getUserOrCreateUser(String address) {
        // 디비에 유저 정보 조회 (지갑주소를 통한 조회).
        User user = userRepository.findByAddress(address).orElse(null);

        if (user == null) {
            // 유저 만들어서 저장
            //난수값 (닉네임과 프로필 패스)
            User newUser = new User();
            newUser.setAddress(address);
            String newNick = RandomStringUtils.random(15, true, true);
            newUser.setNickname(newNick);
            newUser.setProfile_path(
                "https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/f2596e19-e353-4f7f-9afc-eb22582121ca.png");

            user = userRepository.save(newUser);
        }
        return user;
    }

    @Override
    public User getUserInfo(String findBy, String search) {
        User user = null;
        if ("address".equals(findBy)) {
            user = userRepository.findByAddress(search).orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER));
        } else if ("nickname".equals(findBy)) {
            user = userRepository.findByNickname(search).orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER));
        } else {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_OPTION);
        }
        return user;
    }

    @Override
    public String getUserByCommunityId(Long id) {
        User user = communityRepository.findById(id)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_COMMUNITY))
            .getUser();

        return user.getAddress();
    }

    @Override
    public UserRes updateNickname(String address, UserUpdateReq req) {
        User user = userRepository.findByAddress(address)
                .orElseThrow();

        Boolean flag = userRepositorySupport.findUserByNickname(req.getNickname()).isPresent();
        if (flag == true) {
            throw new ApiException(ExceptionEnum.CONFLICT_USER_NICKNAME);
        }

        user.setNickname(req.getNickname());
        User newUser = userRepository.save(user);
        return UserRes.of(newUser);

    }


    public UserRes updateProfilePath(String address, UserReq req, String url) {
        User user = userRepository.findByAddress(address)
                .orElseThrow();

//        if (!user.getAddress().equals(req.getAddress())) {
//            throw new ApiException(ExceptionEnum.NOT_FOUND_USER);
//        }
//
//        user.setNickname(req.getNickname());
//        //url null 분기 처리

        user.setProfile_path(url);

        User newUser = userRepository.save(user);

        return UserRes.of(newUser);
    }
}
