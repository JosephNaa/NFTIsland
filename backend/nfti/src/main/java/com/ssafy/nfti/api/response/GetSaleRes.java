package com.ssafy.nfti.api.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.nfti.db.entity.Community;
import com.ssafy.nfti.db.entity.Items;
import com.ssafy.nfti.db.entity.Sales;
import com.ssafy.nfti.db.entity.User;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
public class GetSaleRes {
    String saleContractAddress;
    LocalDateTime saleCreatedAt;
    String itemName;
    String itemDescription;
    String itemUrl;
    String ownerNickname;
    String communityName;

    public static GetSaleRes of(Sales sale) {
        GetSaleRes res = new GetSaleRes();
        res.setSaleContractAddress(sale.getSaleContractAddress());
        res.setSaleCreatedAt(sale.getCreatedAt());

        Items item = sale.getItem();
        res.setCommunityName(item.getCommunity().getName());
        res.setItemName(item.getItemTitle());
        res.setItemDescription(item.getItemDescription());
        res.setItemUrl(item.getItemUrl());

        User owner = sale.getSeller();
        res.setOwnerNickname(owner.getNickname());

        Community community = item.getCommunity();
        res.setCommunityName(community.getName());

        return res;
    }
}
