package com.ssafy.nfti.db.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "likes")
public class Likes extends BaseEntity{

    @ManyToOne
    private User user;

    @ManyToOne
    private Board board;

}
