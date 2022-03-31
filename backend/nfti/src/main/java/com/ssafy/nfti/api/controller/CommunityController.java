package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.request.CommunityReq;
import com.ssafy.nfti.api.response.CommunityCreateRes;
import com.ssafy.nfti.api.response.CommunityListRes;
import com.ssafy.nfti.api.response.CommunityRes;
import com.ssafy.nfti.api.service.AWSS3Service;
import com.ssafy.nfti.api.service.CommunityService;
import com.ssafy.nfti.common.model.response.BaseResponseBody;
import com.ssafy.nfti.db.entity.Community;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/v1/community")
public class CommunityController {

    @Autowired
    CommunityService communityService;

    @Autowired
    AWSS3Service awss3Service;

    // 생성
    @PostMapping(consumes = {"multipart/form-data"})
    @Transactional
    public ResponseEntity<CommunityCreateRes> createCommunity(
        @ModelAttribute CommunityReq req
    ) {
        log.info("file: " + req.getFile());
        log.info("user address: " + req.getHostAddress());
        String url = awss3Service.uploadFile(req.getFile());

        CommunityCreateRes res = communityService.createCommunity(req, url);
        return ResponseEntity.ok(res);
    }

    // 목록
    @GetMapping
    public ResponseEntity<List<CommunityListRes>> getCommunityList(
        @PageableDefault(sort = "createdAt", direction = Direction.DESC, size = 2) Pageable pageable
    ) {

        List<CommunityListRes> res = communityService.getList(pageable);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/member-sort")
    public ResponseEntity<List<CommunityListRes>> getCommunityListSortByMember(
        @PageableDefault(sort = "createdAt", direction = Direction.DESC, size = 2) Pageable pageable
    ) {

        List<CommunityListRes> res = communityService.getListSortByMember(pageable);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/board-sort")
    public ResponseEntity<List<CommunityListRes>> getCommunityListSortByBoard(
        @PageableDefault(sort = "createdAt", direction = Direction.DESC, size = 2) Pageable pageable
    ) {

        List<CommunityListRes> res = communityService.getListSortByBoard(pageable);

        return ResponseEntity.ok(res);
    }

    // 하나
    @GetMapping("/{id}")
    public ResponseEntity<CommunityRes> getCommunity(@PathVariable Long id) {
        CommunityRes res = communityService.getOne(id);
        return ResponseEntity.ok(res);
    }

    // 수정
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<CommunityRes> updateCommunity(
        @PathVariable Long id,
        @RequestBody CommunityReq req
    ) {
        CommunityRes res = communityService.updateCommunity(id, req);
        return ResponseEntity.ok(res);
    }

    // 삭제
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<BaseResponseBody> deleteCommunity(
        @PathVariable Long id,
        @RequestBody CommunityReq req
    ) {
        communityService.deleteCommunity(id, req.getHostAddress());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
