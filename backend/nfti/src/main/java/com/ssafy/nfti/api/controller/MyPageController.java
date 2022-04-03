package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.response.CommunityListRes;
import com.ssafy.nfti.api.response.MyActivityRes;
import com.ssafy.nfti.api.service.MyPageService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/mypage")
public class MyPageController {

    @Autowired
    MyPageService myPageService;

    @GetMapping("activity")
    public ResponseEntity<List<MyActivityRes>> getMyList(
        @PageableDefault(sort = "createdAt", direction = Direction.DESC, size = 30) Pageable pageable,
        @RequestParam(required = true) String findBy,
        @RequestParam(required = true) String search
    ) {
        List<MyActivityRes> res = myPageService.myActivityList(pageable, findBy, search);

        return ResponseEntity.ok(res);
    }

    @GetMapping("community")
    public ResponseEntity<List<CommunityListRes>> getMyCommunityList(
        @PageableDefault(size = 30) Pageable pageable,
        @RequestParam(required = true) String findBy,
        @RequestParam(required = true) String search,
        @RequestParam(required = true) Boolean onSaleYn
    ) {
        List<CommunityListRes> res = myPageService.myCommunityList(pageable, findBy, search, onSaleYn);
        return ResponseEntity.ok(res);
    }
}
