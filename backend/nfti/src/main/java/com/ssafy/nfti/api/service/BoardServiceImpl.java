package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.BoardReq;
import com.ssafy.nfti.api.response.BoardRes;
import com.ssafy.nfti.db.entity.Board;
import com.ssafy.nfti.db.repository.BoardRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service("boardService")
public class BoardServiceImpl implements BoardService {

    @Autowired
    BoardRepository boardRepository;

    @Override
    public Page<BoardRes> list(Pageable pageable, Long id) {
        Page<Board> postList = boardRepository.findAll(pageable);
        Page<BoardRes> res = new ArrayList<>();
        for (Board board : postList) {
            res.add(BoardRes.of(board));
        }
        return res;
    }

    @Override
    public BoardRes save(BoardReq req) {
        Board board = new Board(
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
}
