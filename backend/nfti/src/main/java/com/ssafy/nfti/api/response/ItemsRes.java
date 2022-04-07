package com.ssafy.nfti.api.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.nfti.db.entity.Items;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
public class ItemsRes {

    private Long tokenId;

    private String itemUrl;

    private String itemTitle;

    private String itemDescription;

    private Boolean onSaleYn;

    private String ownerAddress;

    private Long communityId;

    private String communityName;

    private Boolean payable;

    public static ItemsRes of(Items items) {
        return ItemsRes.builder()
            .tokenId(items.getTokenId())
            .itemUrl(items.getItemUrl())
            .itemTitle(items.getItemTitle())
            .itemDescription(items.getItemDescription())
            .onSaleYn(items.getOnSaleYn())
            .ownerAddress(items.getOwner().getAddress())
            .communityId(items.getCommunity().getId())
            .communityName(items.getCommunity().getName())
            .payable(items.getCommunity().getPayable())
            .build();
    }
}
