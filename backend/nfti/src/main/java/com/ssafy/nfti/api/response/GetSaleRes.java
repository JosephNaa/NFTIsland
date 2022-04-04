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

    Long itemTokenId;
    String itemName;
    String itemDescription;
    String itemUrl;

    Long communityId;
    String communityName;

    String ownerAddress;
    String ownerNickname;

    public static GetSaleRes of(Sales sale) {
        GetSaleRes res = new GetSaleRes();
        res.setSaleContractAddress(sale.getSaleContractAddress());
        res.setSaleCreatedAt(sale.getCreatedAt());

        Items item = sale.getItem();
        res.setItemTokenId(item.getTokenId());
        res.setItemName(item.getItemTitle());
        res.setItemDescription(item.getItemDescription());
        res.setItemUrl(item.getItemUrl());

        Community community = item.getCommunity();
        res.setCommunityId(community.getId());
        res.setCommunityName(community.getName());

        User owner = sale.getSeller();
        res.setOwnerAddress(owner.getAddress());
        res.setOwnerNickname(owner.getNickname());

        return res;
    }
}
