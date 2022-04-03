package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.request.UserReq;
import com.ssafy.nfti.api.response.UserRes;
import com.ssafy.nfti.api.service.UserService;
import com.ssafy.nfti.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/v1/users")
@Api(value = "유저 API", tags = {"User."})
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/address")
    @ApiOperation(value = "지갑 정보 조회", notes = "지갑 정보를 응답")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    // 유저 정보 받아오기
    public ResponseEntity<UserRes> getUserInfoOrCreateUser(@RequestBody UserReq userReq) {

        User user = userService.getUserOrCreateUser(userReq.getAddress());

        return ResponseEntity.status(200).body(UserRes.of(user));
    }

    @GetMapping("/info")
    @ApiOperation(value = "지갑 정보 조회", notes = "지갑 정보를 응답")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
    // 유저 정보 받아오기
    public ResponseEntity<UserRes> getUserInfo(
        @RequestParam(required = true) String findBy,
        @RequestParam(required = true) String search) {
        User user = userService.getUserInfo(findBy, search);

        return ResponseEntity.status(200).body(UserRes.of(user));
    }


}
