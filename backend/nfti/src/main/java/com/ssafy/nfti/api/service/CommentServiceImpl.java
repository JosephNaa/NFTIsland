package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.CommentReq;
import com.ssafy.nfti.api.response.CommentRes;
import com.ssafy.nfti.common.exception.enums.ExceptionEnum;
import com.ssafy.nfti.common.exception.response.ApiException;
import com.ssafy.nfti.db.entity.Board;
import com.ssafy.nfti.db.entity.Comment;
import com.ssafy.nfti.db.repository.BoardRepository;
import com.ssafy.nfti.db.repository.CommentRepository;
import java.util.ArrayList;
import java.util.List;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("commentService")
public class CommentServiceImpl implements CommentService{

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    BoardRepository boardRepository;

    @Override
    public CommentRes addComment(CommentReq req) {
        Board board = boardRepository.findById(req.getBoardId())
            .orElseThrow();

        Comment comment = new Comment(
            req.getUserAddress(),
            req.getContent(),
            board
        );

        Comment res = commentRepository.save(comment);

        return CommentRes.of(res);
    }

    @Override
    public CommentRes selectComment(Long id) {
        Comment comment = commentRepository.findById(id)
            .orElseThrow();

        return CommentRes.of(comment);
    }

    @Override
    public CommentRes updateComment(Long id, CommentReq req) {
        Comment comment = commentRepository.findById(id)
            .orElseThrow();

        if (!comment.getUserAddress().equals(req.getUserAddress())) {
            throw new ApiException(ExceptionEnum.NOT_FOUND_USER);
        }

        comment.setContent(req.getContent());

        Comment res = commentRepository.save(comment);

        return CommentRes.of(res);
    }

    @Override
    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id)
            .orElseThrow();

        commentRepository.delete(comment);
    }

    @Override
    public List<CommentRes> selectByBoard(Long id) {
        List<Comment> list = commentRepository.findByBoard(id);
        List<CommentRes> res = new ArrayList<>();
        for (Comment c : list) {
            res.add(CommentRes.of(c));
        }
        return res;
    }
}
