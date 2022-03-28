package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.CommunityReq;
import com.ssafy.nfti.api.response.CommunityRes;

public interface CommunityService {

    CommunityRes createCommunity(CommunityReq communityReq, String logoPath);

    // 목록

    // 수정

    // 삭제
}
