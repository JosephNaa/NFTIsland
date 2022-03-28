package com.ssafy.nfti.db.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

@Getter
@Setter
@Entity(name = "comment")
public class Comment extends BaseEntity {

    @Column(nullable = false)
    private String content;

    @ManyToOne
    private Board board;
}
