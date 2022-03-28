//package com.ssafy.nfti.db.repository;
//
//import com.querydsl.jpa.impl.JPAQuery;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import com.ssafy.nfti.db.entity.Post;
//import java.awt.print.Pageable;
//import java.util.List;
//import java.util.Objects;
//import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
//import org.springframework.stereotype.Repository;
//
//@Repository
//public class PostRepositorySupport extends QuerydslRepositorySupport {
//
//    private final JPAQueryFactory jpaQueryFactory;
//
//    public PostRepositorySupport(JPAQueryFactory jpaQueryFactory) {
//        super(Post.class);
//        this.jpaQueryFactory = jpaQueryFactory;
//    }
//
//    public List<Post> findAllById(Pageable pageable, Long id) {
//        JPAQuery<Post> query;
//
//        List<Post> postList = Objects.requireNonNull(getQuerydsl())
//            .applyPagination(pageable, query)
//            .fetch();
//    }
//}
