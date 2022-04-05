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
import com.ssafy.nfti.db.entity.QSales;
import com.ssafy.nfti.db.entity.Sales;
import java.util.List;
import java.util.Objects;
import javax.persistence.EntityManager;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class SalesRepositorySupport extends QuerydslRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;
    QSales sales = QSales.sales;
    QItems items = QItems.items;
    QCommunity community = QCommunity.community;

    public SalesRepositorySupport(EntityManager em) {
        super(Sales.class);
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    public List<Sales> findAllSalesOnCommunityId(Pageable pageable, Long communityId) {
        JPAQuery<Sales> query = jpaQueryFactory
            .selectFrom(sales)
            .join(sales.item, items)
            .join(sales.item.community, community)
            .where(sales.item.tokenId.in(
                JPAExpressions
                    .select(items.tokenId)
                    .from(items)
                    .where(items.community.id.eq(communityId)
                        .and(items.onSaleYn.eq(true))))
                .and(sales.saleYn.eq(false)));


        return Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, query)
            .fetch();
    }

    public Long getCommunityTradedCount(Long communityId) {
        List<Long> res = jpaQueryFactory
            .select(sales.count())
            .from(sales)
//            .join(sales.item, items)
//            .join(sales.item.community, community)
            .where(sales.saleYn.eq(true)
                .and(sales.item.community.id.eq(communityId)))
            .fetch();
        return res.get(0);
    }
}
