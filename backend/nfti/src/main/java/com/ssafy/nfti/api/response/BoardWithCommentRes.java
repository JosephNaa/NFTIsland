package com.ssafy.nfti.api.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.nfti.db.entity.Board;
import com.ssafy.nfti.db.entity.Comment;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
public class BoardWithCommentRes {
    Long id;
    String userAddress;
    String title;
    String content;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    List<Comment> comments;

    public static BoardWithCommentRes of(Board board) {
        BoardWithCommentRes res = new BoardWithCommentRes();
        res.setId(board.getId());
        res.setUserAddress(board.getUser().getAddress());
        res.setTitle(board.getTitle());
        res.setContent(board.getContent());
        res.setCreatedAt(board.getCreatedAt());
        res.setUpdatedAt(board.getUpdatedAt());
        res.setComments(board.getComments());

        return res;
    }
}
