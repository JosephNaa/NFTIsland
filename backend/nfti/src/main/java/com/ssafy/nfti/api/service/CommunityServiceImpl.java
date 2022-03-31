package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.CommunityReq;
import com.ssafy.nfti.api.response.CommunityCreateRes;
import com.ssafy.nfti.api.response.CommunityListRes;
import com.ssafy.nfti.api.response.CommunityRes;
import com.ssafy.nfti.common.exception.enums.ExceptionEnum;
import com.ssafy.nfti.common.exception.response.ApiException;
import com.ssafy.nfti.db.entity.Community;
import com.ssafy.nfti.db.entity.User;
import com.ssafy.nfti.db.repository.CommunityRepository;
import com.ssafy.nfti.db.repository.CommunityRepositorySupport;
import com.ssafy.nfti.db.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("communityService")
public class CommunityServiceImpl implements CommunityService {

    @Autowired
    CommunityRepository communityRepository;

    @Autowired
    CommunityRepositorySupport communityRepositorySupport;

    @Autowired
    UserRepository userRepository;

    @Override
    public CommunityCreateRes createCommunity(CommunityReq req, String url) {

        User user =  userRepository.findByAddress(req.getHostAddress())
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER));

        Community community = Community.builder()
            .name(req.getName())
            .description(req.getDescription())
            .payable(req.getPayable())
            .logoPath(url)
            .user(user)
            .build();


        Community res = communityRepository.save(community);

        return CommunityCreateRes.of(res);
    }

    @Override
    public CommunityRes getOne(Long id) {
        Community res = communityRepository.findById(id)
            .orElseThrow();
        return CommunityRes.of(res);
    }

    @Override
    public List<CommunityListRes> getList(Pageable pageable) {
        List<Community> list = communityRepositorySupport.findAllPageSort(pageable);
//        Page<Community> list = communityRepository.findByCreatedAtDesc(pageable);
        List<CommunityListRes> res = new ArrayList<>();

        for (Community c : list) {
            res.add(CommunityListRes.of(c));
        }

        return res;
    }

    @Override
    public List<CommunityListRes> getListSortByMember(Pageable pageable) {
        List<Community> list = communityRepositorySupport.findAllSortByMember(pageable);
        List<CommunityListRes> res = new ArrayList<>();

        for (Community c : list) {
            res.add(CommunityListRes.of(c));
        }

        return res;
    }

    @Override
    public List<CommunityListRes> getListSortByBoard(Pageable pageable) {
        List<Community> list = communityRepositorySupport.findAllSortByBoard(pageable);
        List<CommunityListRes> res = new ArrayList<>();

        for (Community c : list) {
            res.add(CommunityListRes.of(c));
        }

        return res;
    }

    @Override
    public CommunityRes updateCommunity(Long id, CommunityReq req) {
        Community community = communityRepository.findById(id)
            .orElseThrow();

        User user = userRepository.findByAddress(req.getHostAddress())
            .orElseThrow();

        community.setName(req.getName());
        community.setUser(user);
        community.setDescription(req.getDescription());

        Community res = communityRepository.save(community);

        return CommunityRes.of(res);
    }

    @Override
    public void deleteCommunity(Long id, String hostId) {
        Community community = communityRepository.findById(id)
            .orElseThrow();

        if (community.getUser().getAddress().equals(hostId)) {
            communityRepository.delete(community);
        } else {
            throw new ApiException(ExceptionEnum.NOT_FOUND_USER);
        }
    }
}