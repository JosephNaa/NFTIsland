package com.ssafy.nfti.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.nfti.db.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.Optional;

@Repository
public class UserRepositorySupport extends QuerydslRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    public UserRepositorySupport(EntityManager em) {
        super(User.class);
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    QUser qUser = QUser.user;

    public Optional<User> findUserByNickname(String nickname) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.nickname.eq(nickname)).fetchOne();
        if (user == null) return Optional.empty();
        return Optional.ofNullable(user);
    }
}
