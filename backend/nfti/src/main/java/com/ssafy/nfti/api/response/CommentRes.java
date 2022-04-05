package com.ssafy.nfti.api.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.nfti.db.entity.Comment;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
public class CommentRes {
    Long id;
    String userAddress;
    String userProfile;
    String nickName;
    String content;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;

    public static CommentRes of(Comment comment) {

        return CommentRes.builder()
            .id(comment.getId())
            .userAddress(comment.getUser().getAddress())
            .userProfile(comment.getUser().getProfile_path())
            .nickName(comment.getUser().getNickname())
            .content(comment.getContent())
            .createdAt(comment.getCreatedAt())
            .updatedAt(comment.getUpdatedAt())
            .build();
    }
}
