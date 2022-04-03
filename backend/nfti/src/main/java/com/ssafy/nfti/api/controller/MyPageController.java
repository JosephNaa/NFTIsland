package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.response.CommunityListRes;
import com.ssafy.nfti.api.response.MyActivityRes;
import com.ssafy.nfti.api.response.UserRes;
import com.ssafy.nfti.api.service.MyPageService;
import com.ssafy.nfti.api.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/mypage")
@Api(value = "마이 페이지 API", tags = {"MyPage."})
public class MyPageController {

    @Autowired
    MyPageService myPageService;

    @Autowired
    UserService userService;

    @GetMapping("activity")
    @ApiOperation(value = "활동 기록", notes = "내 활동 기록을 불러온다.")
    public ResponseEntity<List<MyActivityRes>> getMyList(
        @PageableDefault(sort = "createdAt", direction = Direction.DESC, size = 12) Pageable pageable,
        @RequestParam(required = true) String findBy,
        @RequestParam(required = true) String search
    ) {
        List<MyActivityRes> res = myPageService.myActivityList(pageable, findBy, search);

        return ResponseEntity.ok(res);
    }

    @GetMapping("community")
    @ApiOperation(value = "커뮤니티 조회", notes = "내가 속한 커뮤니티를 조회한다.")
    public ResponseEntity<List<CommunityListRes>> getMyCommunityList(
        @PageableDefault(size = 30) Pageable pageable,
        @RequestParam(required = true) String findBy,
        @RequestParam(required = true) String search,
        @RequestParam(required = true) Boolean onSaleYn
    ) {
        List<CommunityListRes> res = myPageService.myCommunityList(pageable, findBy, search, onSaleYn);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{address}")
    public ResponseEntity<UserRes> updateNickname(
            @PathVariable String address,
            @RequestParam String nickname
    ) {
//        String url = null;
//        if (req.getProfile_path() != null) {
//            url = awss3Service.uploadFile(req.getProfile_path());
//        }

        UserRes res = userService.updateNickname(address, nickname);

        return ResponseEntity.ok(res);
    }

}
