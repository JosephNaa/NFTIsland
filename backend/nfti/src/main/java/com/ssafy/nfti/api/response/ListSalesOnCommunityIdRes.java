package com.ssafy.nfti.api.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.nfti.db.entity.Sales;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
public class ListSalesOnCommunityIdRes {
    String saleContractAddress;

    Long communityId;
    String communityName;

    Long itemTokenId;
    String itemUrl;
    String itemName;

    public static ListSalesOnCommunityIdRes of(Sales sale) {
        ListSalesOnCommunityIdRes res = new ListSalesOnCommunityIdRes();
        res.setSaleContractAddress(sale.getSaleContractAddress());

        res.setCommunityId(sale.getItem().getCommunity().getId());
        res.setCommunityName(sale.getItem().getCommunity().getName());

        res.setItemTokenId(sale.getItem().getTokenId());
        res.setItemUrl(sale.getItem().getItemUrl());
        res.setItemName(sale.getItem().getItemTitle());
        return res;
    }
}
