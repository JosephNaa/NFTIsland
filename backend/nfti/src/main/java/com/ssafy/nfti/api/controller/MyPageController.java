package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.request.UserReq;
import com.ssafy.nfti.api.request.UserUpdateReq;
import com.ssafy.nfti.api.response.CommunityListRes;
import com.ssafy.nfti.api.response.MyActivityRes;
import com.ssafy.nfti.api.response.UserRes;
import com.ssafy.nfti.api.service.AWSS3Service;
import com.ssafy.nfti.api.service.MyPageService;
import com.ssafy.nfti.api.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.annotation.MultipartConfig;

@RestController
@RequestMapping("/v1/mypage")
@Api(value = "마이 페이지 API", tags = {"MyPage."})
public class MyPageController {

    @Autowired
    MyPageService myPageService;

    @Autowired
    UserService userService;

    @Autowired
    AWSS3Service awss3Service;

    @GetMapping("/activity")
    @ApiOperation(value = "활동 기록", notes = "내 활동 기록을 불러온다.")
    public ResponseEntity<List<MyActivityRes>> getMyList(
        @PageableDefault(sort = "createdAt", direction = Direction.DESC, size = 12) Pageable pageable,
        @RequestParam(required = true) @ApiParam(value = "<strong>address</strong> or <strong>nickname</strong>", name = "find_by") String findBy,
        @RequestParam(required = true) String search,
        @RequestParam(required = false) Long communityId
    ) {
        List<MyActivityRes> res = myPageService.myActivityList(pageable, findBy, search, communityId);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/community")
    @ApiOperation(value = "커뮤니티 조회", notes = "내가 속한 커뮤니티를 조회한다.")
    public ResponseEntity<List<CommunityListRes>> getMyCommunityList(
        @PageableDefault(size = 30) Pageable pageable,
        @RequestParam(required = true) @ApiParam(value = "<strong>address</strong> or <strong>nickname</strong>", name = "find_by") String findBy,
        @RequestParam(required = true) String search,
        @RequestParam(required = true) @ApiParam(value = "<strong>true</strong> or <strong>false</strong>", name = "on_sale_yn") Boolean onSaleYn
    ) {
        List<CommunityListRes> res = myPageService.myCommunityList(pageable, findBy, search, onSaleYn);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/community/master")
    @ApiOperation(value = "내가 마스터인 커뮤니티 조회", notes = "내가 마스터인 커뮤니티들을 조회한다.")
    public ResponseEntity<List<CommunityListRes>> getMyCommunityMasterList(
        @PageableDefault(size = 30) Pageable pageable,
        @RequestParam @ApiParam(value = "<strong>address</strong> or <strong>nickname</strong>", name = "find_by") String findBy,
        @RequestParam String search
    ) {
        List<CommunityListRes> res = myPageService.myCommunityMasterList(pageable, findBy, search);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/usernickname/{address}")
    public ResponseEntity<UserRes> updateNickname(
            @PathVariable String address,
            @RequestBody UserUpdateReq req
    ) {
//        String url = null;
//        if (req.getProfile_path() != null) {
//            url = awss3Service.uploadFile(req.getProfile_path());
//        }

        UserRes res = userService.updateNickname(address, req);

        return ResponseEntity.ok(res);
    }

    @PutMapping("/multipart/{address}")
    public ResponseEntity<UserRes> updateProfilePath(
            @PathVariable String address,
            @ModelAttribute UserReq req
    ) {
        String url = awss3Service.uploadFile(req.getProfile_path());

        UserRes res = userService.updateProfilePath(address, req, url);

        return ResponseEntity.ok(res);
    }

}
