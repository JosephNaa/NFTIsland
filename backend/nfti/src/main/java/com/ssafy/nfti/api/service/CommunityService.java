package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.CommunityReq;
import com.ssafy.nfti.api.response.CommunityRes;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface CommunityService {

    CommunityRes createCommunity(CommunityReq communityReq, String url);

    List<CommunityRes> getList(Pageable pageable);


    // 수정

    // 삭제
}
