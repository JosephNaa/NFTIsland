package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.BoardReq;
import com.ssafy.nfti.api.response.BoardCreateRes;
import com.ssafy.nfti.api.response.BoardRes;
import com.ssafy.nfti.common.exception.enums.ExceptionEnum;
import com.ssafy.nfti.common.exception.response.ApiException;
import com.ssafy.nfti.db.entity.Board;
import com.ssafy.nfti.db.entity.Community;
import com.ssafy.nfti.db.entity.User;
import com.ssafy.nfti.db.repository.BoardRepository;
import com.ssafy.nfti.db.repository.BoardRepositorySupport;
import com.ssafy.nfti.db.repository.CommunityRepository;
import com.ssafy.nfti.db.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service("boardService")
public class BoardServiceImpl implements BoardService {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    BoardRepositorySupport boardRepositorySupport;

    @Autowired
    CommunityRepository communityRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<BoardRes> list(Pageable pageable, Long id, String search) {
        List<Board> postList = boardRepositorySupport.findAllByPageSort(pageable, id, search);
        List<BoardRes> res = new ArrayList<>();
        for (Board board : postList) {
            res.add(BoardRes.of(board));
        }
        return res;
    }

    @Override
    public BoardRes getOne(Long id, Long communityId) {
        // querydsl로 변경
        Community community = communityRepository.findById(communityId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_COMMUNITY));

        Board board = boardRepository.findByIdAndCommunity(id, community)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_BOARD));

        return BoardRes.of(board);
    }

    @Override
    public BoardRes getBoard(Long id) {

        Board board = boardRepository.findById(id)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_BOARD));

        return BoardRes.of(board);
    }

    @Override
    public BoardRes updateBoard(Long id, BoardReq req) {
        Board board = boardRepository.findById(id)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_BOARD));

        if (!board.getUser().getAddress().equals(req.getUserAddress())) {
            throw new ApiException(ExceptionEnum.CONFLICT_USER);
        }

        board.setTitle(req.getTitle());
        board.setContent(req.getContent());

        boardRepository.save(board);

        return BoardRes.of(board);
    }

    @Override
    public BoardCreateRes save(BoardReq req) {
        Community community = communityRepository.findById(req.getCommunityId())
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_COMMUNITY));

        User user = userRepository.findByAddress(req.getUserAddress())
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER));

        try {
            Board board = Board.builder()
                .title(req.getTitle())
                .content(req.getContent())
                .community(community)
                .user(user)
                .build();

            Board res = boardRepository.save(board);
            return BoardCreateRes.of(res);
        } catch (Exception e) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_BOARD);
        }

    }

    @Override
    public void delete(Long id, String userAddress) {
        User user = boardRepository.findById(id)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER)).getUser();

        if (user.getAddress().equals(userAddress)) {
            boardRepository.deleteById(id);
        } else {
            throw new ApiException(ExceptionEnum.CONFLICT_USER);
        }
    }

}
