package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.response.CommunityListRes;
import com.ssafy.nfti.api.response.MyActivityRes;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface MyPageService {
    List<MyActivityRes> myActivityList(Pageable pageable, String address);
    List<CommunityListRes> myCommunityList(Pageable pageable, String address);
}
