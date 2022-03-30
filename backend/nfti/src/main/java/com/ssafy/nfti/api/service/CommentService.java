package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.CommentReq;
import com.ssafy.nfti.api.response.CommentRes;
import com.ssafy.nfti.db.entity.Comment;
import java.util.List;

public interface CommentService {

    CommentRes addComment(CommentReq req);
    CommentRes selectComment(Long id);
    CommentRes updateComment(Long id, CommentReq req);
    void deleteComment(Long id, String address);
    List<CommentRes> selectByBoard(Long boardId);
}
