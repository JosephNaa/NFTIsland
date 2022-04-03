package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.request.LikesReq;
import com.ssafy.nfti.api.service.LikesService;
import com.ssafy.nfti.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/likes")
@Api(value = "좋아요 API", tags = {"Likes."})
public class LikesController {

    @Autowired
    LikesService likesService;

    @PostMapping
    @ApiOperation(value = "좋아요 추가", notes = "좋아요를 추가한다.")
    public ResponseEntity<?> addLike(@RequestBody LikesReq req) {
        BaseResponseBody res = likesService.addLike(req);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping
    @ApiOperation(value = "좋아요 삭제", notes = "좋아요를 삭제한다.")
    public ResponseEntity<?> delLike(@RequestBody LikesReq req) {
        BaseResponseBody res = likesService.delLike(req);
        return ResponseEntity.ok(res);
    }
}
