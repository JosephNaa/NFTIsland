package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.CommunityReq;
import com.ssafy.nfti.api.request.CommunityUpdateReq;
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
    @Transactional
    public CommunityCreateRes createCommunity(CommunityReq req, String url) {

        User user =  userRepository.findByAddress(req.getHostAddress())
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER));

        try {
            Community community = Community.builder()
                .name(req.getName())
                .description(req.getDescription())
                .payable(req.getPayable())
                .logoPath(url)
                .user(user)
                .build();

            Community res = communityRepository.save(community);
            return CommunityCreateRes.of(res);

        } catch (Exception e) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_COMMUNITY);
        }

    }

    @Override
    public CommunityRes getOne(Long id, String search) {
        Community res = communityRepository.findById(id)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_COMMUNITY));
        return CommunityRes.of(res, search);
    }

    @Override
    public List<CommunityListRes> getList(Pageable pageable, String search) {
        List<Community> list = communityRepositorySupport.findAllPageSort(pageable, search);

        List<CommunityListRes> res = new ArrayList<>();
        for (Community c : list) {
            res.add(CommunityListRes.of(c));
        }

        return res;
    }

    @Override
    public List<CommunityListRes> getListSortByMember(Pageable pageable, String search) {
        List<Community> list = communityRepositorySupport.findAllSortByMember(pageable, search);

        List<CommunityListRes> res = new ArrayList<>();
        for (Community c : list) {
            res.add(CommunityListRes.of(c));
        }

        return res;
    }

    @Override
    public List<CommunityListRes> getListSortByBoard(Pageable pageable, String search) {
        List<Community> list = communityRepositorySupport.findAllSortByBoard(pageable, search);

        List<CommunityListRes> res = new ArrayList<>();
        for (Community c : list) {
            res.add(CommunityListRes.of(c));
        }

        return res;
    }

    @Override
    @Transactional
    public CommunityRes updateCommunity(Long id, CommunityUpdateReq req) {
        Community community = communityRepository.findById(id)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_COMMUNITY));

        User user = userRepository.findByAddress(req.getHostAddress())
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER));

        try {
            community.setName(req.getName());
            community.setUser(user);
            community.setDescription(req.getDescription());

            Community res = communityRepository.save(community);

            return CommunityRes.of(res, "");
        } catch (Exception e) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_USER);
        }
    }

    @Override
    @Transactional
    public void deleteCommunity(Long id, String hostId) {
        Community community = communityRepository.findById(id)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_COMMUNITY));

        if (community.getUser().getAddress().equals(hostId)) {
            communityRepository.delete(community);
        } else {
            throw new ApiException(ExceptionEnum.CONFLICT_USER);
        }
    }
}
