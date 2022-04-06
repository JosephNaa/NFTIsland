package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.LikesReq;
import com.ssafy.nfti.common.exception.enums.ExceptionEnum;
import com.ssafy.nfti.common.exception.response.ApiException;
import com.ssafy.nfti.common.model.response.BaseResponseBody;
import com.ssafy.nfti.db.entity.Board;
import com.ssafy.nfti.db.entity.Community;
import com.ssafy.nfti.db.entity.Likes;
import com.ssafy.nfti.db.entity.User;
import com.ssafy.nfti.db.repository.BoardRepository;
import com.ssafy.nfti.db.repository.CommunityRepository;
import com.ssafy.nfti.db.repository.LikesRepository;
import com.ssafy.nfti.db.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service("likesService")
public class LikesServiceImpl implements LikesService {

    @Autowired
    LikesRepository likesRepository;

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CommunityRepository communityRepository;

    public boolean isLike(LikesReq req) {
        return likesRepository.findByUserAddressAndBoardId(req.getUserAddress(), req.getBoardId())
            .isPresent();
    }

    @Override
    public BaseResponseBody addLike(LikesReq req) {

        if (!isLike(req)) {
            Community community = communityRepository.findById(req.getCommunityId())
                .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_COMMUNITY));

            Likes newLikes = Likes.builder()
                .board(boardRepository.findByIdAndCommunity(req.getBoardId(), community)
                    .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_BOARD)))
                .user(userRepository.findByAddress(req.getUserAddress())
                    .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER)))
                .build();

            likesRepository.save(newLikes);

            return BaseResponseBody.of(200, "Added");

        } else {
            return BaseResponseBody.of(HttpStatus.BAD_REQUEST.value(), "Error");
        }

    }

    @Override
    public BaseResponseBody delLike(LikesReq req) {

        if (isLike(req)) {
            Likes delLikes = likesRepository.findByUserAddressAndBoardId(req.getUserAddress(), req.getBoardId())
                .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_LIKES));

            likesRepository.delete(delLikes);

            return BaseResponseBody.of(HttpStatus.OK.value(), "Deleted");

        } else {
            return BaseResponseBody.of(HttpStatus.BAD_REQUEST.value(), "Error");
        }
    }

    @Override
    public List<Likes> getListByBoardId(Long id) {
        return likesRepository.findByBoardId(id);
    }
}
