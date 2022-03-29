package com.ssafy.nfti.api.service;


import com.ssafy.nfti.db.entity.User;
import com.ssafy.nfti.db.repository.UserRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;



    @Override
    public User getUserByAddress(String address) {
        // 디비에 유저 정보 조회 (지갑주소를 통한 조회).
        User user = userRepository.findByAddress(address).orElse(null);

        if (user == null) {
            // 유저 만들어서 저장
            //난수값 (닉네임과 프로필 패스)
            User newUser = new User();
            newUser.setAddress(address);
            String newNick = RandomStringUtils.random(15, true, true);
            newUser.setNickname(newNick);
            newUser.setProfile_path("https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/f2596e19-e353-4f7f-9afc-eb22582121ca.png");


            user = userRepository.save(newUser);
        }
        return user;
    }
}
