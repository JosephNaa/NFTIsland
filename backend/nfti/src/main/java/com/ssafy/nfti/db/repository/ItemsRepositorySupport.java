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
import com.ssafy.nfti.db.entity.QUser;
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
    QUser user = QUser.user;
    QCommunity community = QCommunity.community;

    public ItemsRepositorySupport(EntityManager em) {
        super(Items.class);
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    public List<Community> findAllMyCommunity(Pageable pageable, String findBy, String search, Boolean onSaleYn) {
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

    public List<Community> findAllCommunityOnSale(Pageable pageable) {
        JPAQuery<Community> query = jpaQueryFactory
            .selectFrom(community)
            .join(community.user, user)
            .where(community.id.in(
                JPAExpressions
                    .select(items.community.id)
                    .distinct()
                    .from(items)
                    .where(items.onSaleYn.eq(true))));
        return Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, query)
            .fetch();
    }

    public Long getCommunityItemCount(Long communityId) {
        List<Long> res = jpaQueryFactory
            .select(items.count())
            .from(items)
            .where(items.community.id.eq(communityId))
            .fetch();

        return res.get(0);
    }

    public Long getCommunityOwnerCount(Long communityId) {
        List<Long> res = jpaQueryFactory
            .select(items.owner.countDistinct())
            .from(items)
            .where(items.community.id.eq(communityId))
            .fetch();

        return res.get(0);
    }

    public Long getItemCountByCommunity(Long communityId) {
        List<Long> res = jpaQueryFactory
            .select(items.count())
            .from(items)
            .where(items.community.id.eq(communityId))
            .fetch();

        return res.get(0);
    }
}
