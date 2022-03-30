package com.ssafy.nfti.db.repository;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.nfti.db.entity.Board;
import com.ssafy.nfti.db.entity.QBoard;
import com.ssafy.nfti.db.entity.QCommunity;
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

    public List<Board> findAllByPageSort(Pageable pageable, Long id) {
        JPAQuery<Board> query = jpaQueryFactory
            .selectFrom(board)
            .where(community.id.eq(id));

        return Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, query)
            .fetch();
    }
}
