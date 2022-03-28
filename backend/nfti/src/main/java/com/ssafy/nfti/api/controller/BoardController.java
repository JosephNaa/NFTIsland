package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.request.BoardReq;
import com.ssafy.nfti.api.response.BoardRes;
import com.ssafy.nfti.api.service.BoardService;
import com.ssafy.nfti.common.model.response.BaseResponseBody;
import com.ssafy.nfti.db.entity.Board;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    @PostMapping()
    public ResponseEntity<BoardRes> postBoard(@RequestBody BoardReq req) {
        BoardRes res = boardService.save(req);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{id}/list")
    public ResponseEntity<List<BoardRes>> getList(
        @PageableDefault(sort = "createdAt", direction = Direction.DESC, size = 2) Pageable pageable,
        @PathVariable Long id
    ) {
        List<BoardRes> res = boardService.list(pageable, id);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardRes> getBoard(@PathVariable Long id) {
        BoardRes res = boardService.getOne(id);
        return ResponseEntity.ok(res);
    }

//    @GetMapping("/{id}")
//    public List<Map<String, Object>> getBoard(@PathVariable Long id) {
//        return boardService.findWithComment(id);
//    }

    @PutMapping("/{id}")
    public ResponseEntity<BoardRes> updateBoard(
        @PathVariable Long id,
        @RequestBody BoardReq req
    ) {
        BoardRes res = boardService.updateBoard(id, req);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponseBody> deleteBoard(@PathVariable("id") Long id) {
        boardService.delete(id);
        return ResponseEntity.ok(BaseResponseBody.of(200, "Success"));
    }
}
