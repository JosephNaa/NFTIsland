package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.CommentReq;
import com.ssafy.nfti.api.response.CommentRes;
import com.ssafy.nfti.common.exception.enums.ExceptionEnum;
import com.ssafy.nfti.common.exception.response.ApiException;
import com.ssafy.nfti.db.entity.Board;
import com.ssafy.nfti.db.entity.Comment;
import com.ssafy.nfti.db.entity.User;
import com.ssafy.nfti.db.repository.BoardRepository;
import com.ssafy.nfti.db.repository.CommentRepository;
import com.ssafy.nfti.db.repository.UserRepository;
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

    @Autowired
    UserRepository userRepository;

    @Override
    public CommentRes addComment(CommentReq req) {
        Board board = boardRepository.findById(req.getBoardId())
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_BOARD));

        User user = userRepository.findByAddress(req.getUserAddress())
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER));

        try {
            Comment comment = Comment.builder()
                .content(req.getContent())
                .board(board)
                .user(user)
                .build();

            Comment res = commentRepository.save(comment);

            return CommentRes.of(res);
        } catch (Exception e) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_COMMENT);
        }

    }

    @Override
    public CommentRes selectComment(Long id) {
        Comment comment = commentRepository.findById(id)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_COMMENT));

        return CommentRes.of(comment);
    }

    @Override
    public CommentRes updateComment(Long id, CommentReq req) {
        Comment comment = commentRepository.findById(id)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_COMMENT));

        if (!comment.getUser().getAddress().equals(req.getUserAddress())) {
            throw new ApiException(ExceptionEnum.CONFLICT_USER);
        }

        try {
            comment.setContent(req.getContent());

            Comment res = commentRepository.save(comment);

            return CommentRes.of(res);
        } catch (Exception e) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_COMMENT);
        }

    }

    @Override
    public void deleteComment(Long id, String address) {
        User user = userRepository.findByAddress(address)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER));

        if (user.getAddress().equals(address)) {
            Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_COMMENT));

            commentRepository.delete(comment);
        } else {
            throw new ApiException(ExceptionEnum.CONFLICT_USER);
        }

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
