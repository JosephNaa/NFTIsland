package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.request.CommentReq;
import com.ssafy.nfti.api.request.DeleteReq;
import com.ssafy.nfti.api.request.ValidReq;
import com.ssafy.nfti.api.response.CommentRes;
import com.ssafy.nfti.api.service.CommentService;
import com.ssafy.nfti.common.model.response.BaseResponseBody;
import com.ssafy.nfti.db.entity.Comment;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/comment")
@Api(value = "댓글 API", tags = {"Comment."})
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping()
    @ApiOperation(value = "댓글 생성", notes = "댓글을 생성한다.")
    public ResponseEntity<CommentRes> addComment(@RequestBody CommentReq req) {
        CommentRes res = commentService.addComment(req);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{id}")
    @ApiOperation(value = "댓글 수정", notes = "댓글을 수정한다.")
    public ResponseEntity<CommentRes> updateComment(@PathVariable Long id, @RequestBody CommentReq req) {
        CommentRes res = commentService.updateComment(id, req);

        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "댓글 삭제", notes = "댓글을 삭제한다.")
    public ResponseEntity<BaseResponseBody> deleteComment(
        @PathVariable Long id,
        @RequestBody ValidReq req
    ) {
        commentService.deleteComment(id, req.getUserAddress());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
