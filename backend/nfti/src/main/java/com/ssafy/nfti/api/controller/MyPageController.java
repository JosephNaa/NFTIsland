package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.response.CommunityListRes;
import com.ssafy.nfti.api.response.MyActivityRes;
import com.ssafy.nfti.api.service.MyPageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
@Api(value = "마이 페이지 API", tags = {"MyPage."})
public class MyPageController {

    @Autowired
    MyPageService myPageService;

    @GetMapping("activity")
    @ApiOperation(value = "활동 기록", notes = "내 활동 기록을 불러온다.")
    public ResponseEntity<List<MyActivityRes>> getMyList(
        @PageableDefault(sort = "createdAt", direction = Direction.DESC, size = 2) Pageable pageable,
        @RequestParam String address
    ) {
        List<MyActivityRes> res = myPageService.myActivityList(pageable, address);

        return ResponseEntity.ok(res);
    }

    @GetMapping("community")
    @ApiOperation(value = "커뮤니티 조회", notes = "내가 속한 커뮤니티를 조회한다.")
    public ResponseEntity<List<CommunityListRes>> getMyCommunityList(
        @PageableDefault(size = 30) Pageable pageable,
        @RequestParam String address,
        @RequestParam(required = true) Boolean onSaleYn
    ) {
        List<CommunityListRes> res = myPageService.myCommunityList(pageable, address, onSaleYn);
        return ResponseEntity.ok(res);
    }
}
