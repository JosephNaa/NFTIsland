package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.request.CommunityReq;
import com.ssafy.nfti.api.response.CommunityRes;
import com.ssafy.nfti.api.service.AWSS3Service;
import com.ssafy.nfti.api.service.CommunityService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/v1/community")
public class CommunityController {

    @Autowired
    CommunityService communityService;

    @Autowired
    AWSS3Service awss3Service;

    @PostMapping
    @Transactional
    public ResponseEntity<CommunityRes> createCommunity(
        @RequestPart(value = "file") MultipartFile file,
        @RequestPart(value = "req") CommunityReq req
    ) {
        String url = awss3Service.uploadFile(file);

        CommunityRes res = communityService.createCommunity(req, url);
        return ResponseEntity.ok(res);
    }

    // 목록
    @GetMapping
    public ResponseEntity<List<CommunityRes>> getCommunityList() {

        List<CommunityRes> res = communityService.getList();

        return ResponseEntity.ok(res);
    }

    // 수정

    // 삭제
}
