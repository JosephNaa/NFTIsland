package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.LikesReq;
import com.ssafy.nfti.common.exception.enums.ExceptionEnum;
import com.ssafy.nfti.common.exception.response.ApiException;
import com.ssafy.nfti.db.entity.Board;
import com.ssafy.nfti.db.entity.Likes;
import com.ssafy.nfti.db.entity.User;
import com.ssafy.nfti.db.repository.BoardRepository;
import com.ssafy.nfti.db.repository.LikesRepository;
import com.ssafy.nfti.db.repository.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("likesService")
public class LikesServiceImpl implements LikesService {

    @Autowired
    LikesRepository likesRepository;

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    UserRepository userRepository;

    public boolean isLike(LikesReq req) {
        return likesRepository.findByUserAddressAndBoardId(req.getUserAddress(), req.getBoardId())
            .isPresent();
    }

    @Override
    public String addLike(LikesReq req) {

        if (!isLike(req)) {
            Likes newLikes = Likes.builder()
                .board(boardRepository.findById(req.getBoardId())
                    .orElseThrow())
                .user(userRepository.findByAddress(req.getUserAddress())
                    .orElseThrow())
                .build();

            likesRepository.save(newLikes);

            return "added";
        } else {
            return "error";
        }

    }

    @Override
    public String delLike(LikesReq req) {

        Optional<Likes> delLike = likesRepository.findByUserAddressAndBoardId(req.getUserAddress(), req.getBoardId());
        delLike.ifPresent(likesRepository::delete);

        return "deleted";
    }
}
