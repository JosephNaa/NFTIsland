package com.ssafy.nfti.db.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "comment")
public class Comment extends BaseEntity {

    @Column(nullable = false)
    private String content;

    @ManyToOne
    private Board board;

    private String userAddress;

    @Builder
    public Comment(
        String userAddress,
        String content,
        Board board
    ) {
        this.userAddress = userAddress;
        this.content = content;
        this.board = board;
    }
}
