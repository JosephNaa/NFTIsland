package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.CommunityReq;
import com.ssafy.nfti.api.response.CommunityRes;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface CommunityService {

    CommunityRes createCommunity(CommunityReq req, String url);
    CommunityRes getOne(Long id);
    List<CommunityRes> getList(Pageable pageable);
    CommunityRes updateCommunity(Long id, CommunityReq req);

    // 삭제
}
