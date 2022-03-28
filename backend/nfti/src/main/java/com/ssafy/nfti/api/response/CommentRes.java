package com.ssafy.nfti.api.response;

import com.ssafy.nfti.db.entity.Comment;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRes {
    Long id;
    String userAddress;
    String content;
    LocalDateTime createdAt;

    public static CommentRes of(Comment comment) {
        CommentRes res = new CommentRes();
        res.setId(comment.getId());
        res.setUserAddress(comment.getUserAddress());
        res.setContent(comment.getContent());
        res.setCreatedAt(comment.getCreatedAt());

        return res;
    }
}
