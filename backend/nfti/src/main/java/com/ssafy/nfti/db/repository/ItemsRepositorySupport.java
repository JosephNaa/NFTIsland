package com.ssafy.nfti.db.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
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

    public List<Community> findAllMyCommunityId(Pageable pageable, String address, Boolean onSaleYn) {
        JPAQuery<Community> query = jpaQueryFactory
            .selectFrom(community)
            .where(community.id.in(
                JPAExpressions
                    .select(items.community.id)
                    .distinct()
                    .from(items)
                    .where(
                        items.owner.address.eq(address)
                    .and(items.onSaleYn.eq(onSaleYn)))));

        return Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, query)
            .fetch();
    }
}
