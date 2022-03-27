package com.ssafy.nfti.db.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "like")
public class Like extends BaseEntity{

    // user address

    @ManyToOne
    private Post post;

}
