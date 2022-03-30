package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.request.MyPageReq;
import com.ssafy.nfti.api.response.BoardRes;
import com.ssafy.nfti.api.response.MyActivityRes;
import com.ssafy.nfti.api.service.BoardService;
import com.ssafy.nfti.api.service.MyPageService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/mypage")
public class MyPageController {

    @Autowired
    MyPageService myPageService;

    @GetMapping()
    public ResponseEntity<List<MyActivityRes>> getMyList(
        @PageableDefault(sort = "createdAt", direction = Direction.DESC, size = 2) Pageable pageable,
        @RequestBody MyPageReq req
    ) {
        List<MyActivityRes> res = myPageService.myActivityList(req.getAddress());

        return ResponseEntity.ok(res);
    }
}
