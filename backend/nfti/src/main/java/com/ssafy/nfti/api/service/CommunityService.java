package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.CommunityReq;
import com.ssafy.nfti.api.response.CommunityCreateRes;
import com.ssafy.nfti.api.response.CommunityListRes;
import com.ssafy.nfti.api.response.CommunityRes;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface CommunityService {

    CommunityCreateRes createCommunity(CommunityReq req, String url);
    CommunityRes getOne(Long id);
    List<CommunityListRes> getList(Pageable pageable);
    List<CommunityListRes> getListSortByMember(Pageable pageable);
    List<CommunityListRes> getListSortByBoard(Pageable pageable);
    CommunityRes updateCommunity(Long id, CommunityReq req);
    void deleteCommunity(Long id, String hostId);
}
