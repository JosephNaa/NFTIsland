package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.CommunityReq;
import com.ssafy.nfti.api.request.CommunityUpdateReq;
import com.ssafy.nfti.api.response.CommunityCreateRes;
import com.ssafy.nfti.api.response.CommunityListRes;
import com.ssafy.nfti.api.response.CommunityRes;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface CommunityService {

    CommunityCreateRes createCommunity(CommunityReq req, String url);
    CommunityRes getOne(Long id, String search);
    List<CommunityListRes> getList(Pageable pageable, String search);
    List<CommunityListRes> getListSortByMember(Pageable pageable, String search);
    List<CommunityListRes> getListSortByBoard(Pageable pageable, String search);
    CommunityRes updateCommunity(Long id, CommunityUpdateReq req);
    void deleteCommunity(Long id, String hostId);
}
