package com.ssafy.nfti.db.repository;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.nfti.db.entity.Community;
import com.ssafy.nfti.db.entity.QCommunity;
import java.util.List;
import java.util.Objects;
import javax.persistence.EntityManager;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class CommunityRepositorySupport extends QuerydslRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    public CommunityRepositorySupport(EntityManager em) {
        super(Community.class);
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    QCommunity community = QCommunity.community;

    public List<Community> findAllPageSort(Pageable pageable) {
        JPAQuery<Community> query = jpaQueryFactory
            .selectFrom(community);
//            .orderBy(community.id.desc());
//            .offset(pageable.getOffset())
//            .limit(pageable.getPageSize())
//            .fetch();

        return Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, query)
            .fetch();
    }

    public List<Community> findAllSortByMember(Pageable pageable) {
        JPAQuery<Community> query = jpaQueryFactory
            .selectFrom(community)
            .orderBy(community.items.size().desc());

        return Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, query)
            .fetch();
    }

    public List<Community> findAllSortByBoard(Pageable pageable) {
        JPAQuery<Community> query = jpaQueryFactory
            .selectFrom(community)
            .orderBy(community.boards.size().desc());

        return Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, query)
            .fetch();
    }
}
