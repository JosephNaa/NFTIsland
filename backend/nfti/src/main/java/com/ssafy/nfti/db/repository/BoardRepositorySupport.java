package com.ssafy.nfti.db.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.nfti.common.exception.enums.ExceptionEnum;
import com.ssafy.nfti.common.exception.response.ApiException;
import com.ssafy.nfti.db.entity.Board;
import com.ssafy.nfti.db.entity.QBoard;
import com.ssafy.nfti.db.entity.QCommunity;
import com.ssafy.nfti.db.entity.QUser;
import java.util.List;
import java.util.Objects;
import javax.persistence.EntityManager;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class BoardRepositorySupport extends QuerydslRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    public BoardRepositorySupport(EntityManager em) {
        super(Board.class);
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    QCommunity community = QCommunity.community;
    QBoard board = QBoard.board;
    QUser user = QUser.user;

    public List<Board> findAllByPageSort(Pageable pageable, Long id, String search) {
        JPAQuery<Board> query = jpaQueryFactory
            .selectFrom(board)
            .where(community.id.eq(id)
                .and(board.title.contains(search)));

        return Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, query)
            .fetch();
    }

    public List<Board> findAllByPageSortAndUser(Pageable pageable, String findBy, String search, Long communityId) {
        BooleanExpression whereQuery = null;
        if ("address".equals(findBy)) {
            whereQuery = user.address.eq(search);
        } else if ("nickname".equals(findBy)) {
            whereQuery = user.nickname.eq(search);
        } else {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_OPTION);
        }

        if (communityId != null) {
            whereQuery = whereQuery.and(community.id.eq(communityId));
        }
        JPAQuery<Board> query = jpaQueryFactory
            .selectFrom(board)
            .where(whereQuery);

        return Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, query)
            .fetch();
    }
}
