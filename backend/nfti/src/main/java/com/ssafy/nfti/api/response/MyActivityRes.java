package com.ssafy.nfti.api.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.nfti.db.entity.Board;
import com.ssafy.nfti.db.entity.Comment;
import com.ssafy.nfti.db.entity.Community;
import com.ssafy.nfti.db.entity.Likes;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
public class MyActivityRes {
    Long id;
    Long communityId;
    String communityName;
    String userAddress;
    String userProfile;
    String nickName;
    String title;
    String content;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    Integer commentCount;
    Integer likesCount;

    public static MyActivityRes of(Board board) {

        int commentCounts = 0;
        for (Comment ignored : board.getComments()) {
            commentCounts += 1;
        }

        int likesCounts = 0;
        for (Likes ignored : board.getLikes()) {
            likesCounts += 1;
        }

        return MyActivityRes.builder()
            .id(board.getId())
            .communityId(board.getCommunity().getId())
            .communityName(board.getCommunity().getName())
            .userAddress(board.getUser().getAddress())
            .userProfile(board.getUser().getProfile_path())
            .nickName(board.getUser().getNickname())
            .title(board.getTitle())
            .content(board.getContent())
            .createdAt(board.getCreatedAt())
            .updatedAt(board.getUpdatedAt())
            .commentCount(commentCounts)
            .likesCount(likesCounts)
            .build();
    }
}
