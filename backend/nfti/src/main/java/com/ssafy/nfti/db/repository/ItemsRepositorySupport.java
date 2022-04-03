package com.ssafy.nfti.db.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.nfti.common.exception.enums.ExceptionEnum;
import com.ssafy.nfti.common.exception.response.ApiException;
import com.ssafy.nfti.db.entity.Community;
import com.ssafy.nfti.db.entity.Items;
import com.ssafy.nfti.db.entity.QCommunity;
import com.ssafy.nfti.db.entity.QItems;
import java.util.List;
import java.util.Objects;
import javax.persistence.EntityManager;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class ItemsRepositorySupport extends QuerydslRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;
    QItems items = QItems.items;
    QCommunity community = QCommunity.community;

    public ItemsRepositorySupport(EntityManager em) {
        super(Items.class);
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    public List<Community> findAllMyCommunityId(Pageable pageable, String findBy, String search, Boolean onSaleYn) {
        JPAQuery<Community> query = null;

        if ("address".equals(findBy)) {
            query = jpaQueryFactory
                .selectFrom(community)
                .where(community.id.in(
                    JPAExpressions
                        .select(items.community.id)
                        .distinct()
                        .from(items)
                        .where(
                            items.owner.address.eq(search)
                                .and(items.onSaleYn.eq(onSaleYn)))));
        } else if ("nickname".equals(findBy)) {
            query = jpaQueryFactory
                .selectFrom(community)
                .where(community.id.in(
                    JPAExpressions
                        .select(items.community.id)
                        .distinct()
                        .from(items)
                        .where(
                            items.owner.nickname.eq(search)
                                .and(items.onSaleYn.eq(onSaleYn)))));
        } else {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_OPTION);
        }

        return Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, query)
            .fetch();
    }
}
