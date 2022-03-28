package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.BoardReq;
import com.ssafy.nfti.api.response.BoardRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardService {
    Page<BoardRes> list(Pageable pageable, Long id);
    BoardRes save(BoardReq req);
    void delete(Long id);
}
