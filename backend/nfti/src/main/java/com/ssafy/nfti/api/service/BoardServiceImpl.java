package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.BoardReq;
import com.ssafy.nfti.api.response.BoardRes;
import com.ssafy.nfti.common.exception.enums.ExceptionEnum;
import com.ssafy.nfti.common.exception.response.ApiException;
import com.ssafy.nfti.db.entity.Board;
import com.ssafy.nfti.db.entity.Community;
import com.ssafy.nfti.db.repository.BoardRepository;
import com.ssafy.nfti.db.repository.BoardRepositorySupport;
import com.ssafy.nfti.db.repository.CommunityRepository;
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

    @Override
    public List<BoardRes> list(Pageable pageable, Long id) {
        List<Board> postList = boardRepositorySupport.findAllByPageSort(pageable);
        List<BoardRes> res = new ArrayList<>();
        for (Board board : postList) {
            res.add(BoardRes.of(board));
        }
        return res;
    }

    @Override
    public BoardRes getOne(Long id) {
        Board board = boardRepository.findById(id)
            .orElseThrow();

        return BoardRes.of(board);
    }

    @Override
    public BoardRes updateBoard(Long id, BoardReq req) {
        Board board = boardRepository.findById(id)
            .orElseThrow();

        if (!board.getUserAddress().equals(req.getUserAddress())) {
            throw new ApiException(ExceptionEnum.NOT_FOUND_USER);
        }

        board.setTitle(req.getTitle());
        board.setContent(req.getContent());

        boardRepository.save(board);

        return BoardRes.of(board);
    }

    @Override
    public BoardRes save(BoardReq req) {
        Community community = communityRepository.findById(req.getCommunityId())
            .orElseThrow();

        Board board = new Board(
            community,
            req.getUserAddress(),
            req.getTitle(),
            req.getContent()
        );
        Board res = boardRepository.save(board);
        return BoardRes.of(res);
    }

    @Override
    public void delete(Long id) {
        boardRepository.deleteById(id);
    }

//    @Override
//    public List<Map<String, Object>> findWithComment(Long boardId) {
//        return boardRepository.findWithComment(boardId);
//    }


}
