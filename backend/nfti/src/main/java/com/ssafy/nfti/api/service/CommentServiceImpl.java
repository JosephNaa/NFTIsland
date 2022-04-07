package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.CommentReq;
import com.ssafy.nfti.api.response.CommentRes;
import com.ssafy.nfti.common.exception.enums.ExceptionEnum;
import com.ssafy.nfti.common.exception.response.ApiException;
import com.ssafy.nfti.db.entity.Board;
import com.ssafy.nfti.db.entity.Comment;
import com.ssafy.nfti.db.entity.Community;
import com.ssafy.nfti.db.entity.User;
import com.ssafy.nfti.db.repository.BoardRepository;
import com.ssafy.nfti.db.repository.CommentRepository;
import com.ssafy.nfti.db.repository.CommunityRepository;
import com.ssafy.nfti.db.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("commentService")
public class CommentServiceImpl implements CommentService{

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CommunityRepository communityRepository;

    @Override
    @Transactional
    public CommentRes addComment(CommentReq req) {
        Community community = communityRepository.findById(req.getCommunityId())
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_COMMUNITY));

        Board board = boardRepository.findByIdAndCommunity(req.getBoardId(), community)
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
    @Transactional
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
    @Transactional
    public void deleteComment(Long id, String address) {
        User user = commentRepository.findById(id)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER)).getUser();

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
