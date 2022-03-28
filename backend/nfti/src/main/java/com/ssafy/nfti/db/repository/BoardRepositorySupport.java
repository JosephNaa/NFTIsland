//package com.ssafy.nfti.db.repository;
//
//import com.querydsl.jpa.impl.JPAQuery;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import com.ssafy.nfti.db.entity.Board;
//import java.awt.print.Pageable;
//import java.util.List;
//import java.util.Objects;
//import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
//import org.springframework.stereotype.Repository;
//
//@Repository
//public class BoardRepositorySupport extends QuerydslRepositorySupport {
//
//    private final JPAQueryFactory jpaQueryFactory;
//
//    public BoardRepositorySupport(JPAQueryFactory jpaQueryFactory) {
//        super(Board.class);
//        this.jpaQueryFactory = jpaQueryFactory;
//    }
//
//    public List<Board> findAllById(Pageable pageable, Long id) {
//        JPAQuery<Board> query;
//
//        List<Board> postList = Objects.requireNonNull(getQuerydsl())
//            .applyPagination(pageable, query)
//            .fetch();
//    }
//}
