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
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
public class BoardRes {
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
    List<CommentRes> comments;
    List<String> likes;

    public static BoardRes of(Board board) {

        List<CommentRes> comments = new ArrayList<>();
        for (Comment comment : board.getComments()) {
            comments.add(CommentRes.of(comment));
        }

        List<String> likes = new ArrayList<>();
        int count = 0;
        for (Likes _like : board.getLikes()) {
            likes.add(_like.getUser().getAddress());
            count += 1;
        }

        return BoardRes.builder()
            .id(board.getId())
            .userAddress(board.getUser().getAddress())
            .userProfile(board.getUser().getProfile_path())
            .nickName(board.getUser().getNickname())
            .title(board.getTitle())
            .content(board.getContent())
            .createdAt(board.getCreatedAt())
            .updatedAt(board.getUpdatedAt())
            .commentCount(comments.size())
            .likesCount(count)
            .comments(comments)
            .likes(likes)
            .build();
    }
}
