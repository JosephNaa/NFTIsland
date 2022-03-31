package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.request.LikesReq;
import com.ssafy.nfti.api.service.LikesService;
import com.ssafy.nfti.common.model.response.BaseResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/likes")
public class LikesController {

    @Autowired
    LikesService likesService;

    @PostMapping
    public ResponseEntity<?> addLike(@RequestBody LikesReq req) {
        String message = likesService.addLike(req);
        return ResponseEntity.ok(BaseResponseBody.of(200, message));
    }

    @DeleteMapping
    public ResponseEntity<?> delLike(@RequestBody LikesReq req) {
        String message = likesService.delLike(req);
        return ResponseEntity.ok(BaseResponseBody.of(200, message));
    }
}