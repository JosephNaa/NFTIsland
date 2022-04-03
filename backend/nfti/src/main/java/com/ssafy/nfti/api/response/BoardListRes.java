package com.ssafy.nfti.api.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.nfti.db.entity.Board;
import com.ssafy.nfti.db.entity.Comment;
import com.ssafy.nfti.db.entity.Likes;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
public class BoardListRes {
    Long id;
    String userAddress;
    String userProfile;
    String nickName;
    String title;
    String content;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    Integer commentCount;
    Integer likesCount;

    public static BoardListRes of(Board board) {

        int count = 0;
        for (Likes ignored : board.getLikes()) {
            count += 1;
        }

        return BoardListRes.builder()
            .id(board.getId())
            .userAddress(board.getUser().getAddress())
            .userProfile(board.getUser().getProfile_path())
            .nickName(board.getUser().getNickname())
            .title(board.getTitle())
            .content(board.getContent())
            .createdAt(board.getCreatedAt())
            .updatedAt(board.getUpdatedAt())
            .commentCount(board.getComments().size())
            .likesCount(count)
            .build();
    }
}
