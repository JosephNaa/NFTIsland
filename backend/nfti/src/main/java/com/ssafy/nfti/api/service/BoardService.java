package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.BoardReq;
import com.ssafy.nfti.api.response.BoardCreateRes;
import com.ssafy.nfti.api.response.BoardRes;
import com.ssafy.nfti.db.entity.Board;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Pageable;

public interface BoardService {
    BoardCreateRes save(BoardReq req);
    List<BoardRes> list(Pageable pageable, Long id);
    BoardRes getOne(Long id);
    BoardRes updateBoard(Long id, BoardReq req);
    void delete(Long id, String userAddress);

//    List<Map<String, Object>> findWithComment(Long boardId);
}
