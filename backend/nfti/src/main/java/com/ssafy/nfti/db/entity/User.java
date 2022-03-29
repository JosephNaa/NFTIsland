package com.ssafy.nfti.db.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "user")
@Getter
@Setter
public class User {

    // 유저 지갑 주소
    @Id
    @Column(
            name = "address",
            nullable = false,
            unique = true
    )
    private String address;

    @Column(
            name = "nickname",
            nullable = false,
            length = 20
    )
    private String nickname;

    @Column(
            name = "profile_path"
    )
    private String profile_path;
}
