package com.ssafy.nfti.api.response;

import com.ssafy.nfti.db.entity.Board;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardRes {
    Long id;
    String userAddress;
    String title;
    String content;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;

    public static BoardRes of(Board board) {
        BoardRes res = new BoardRes();
        res.setId(board.getId());
        res.setUserAddress(board.getUserAddress());
        res.setTitle(board.getTitle());
        res.setContent(board.getContent());
        res.setCreatedAt(board.getCreatedAt());
        res.setUpdatedAt(board.getUpdatedAt());

        return res;
    }
}
