package com.ssafy.nfti.api.response;

import com.ssafy.nfti.db.entity.Items;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

@Getter
@Setter
public class ItemsRes {

    private Long id;
    private Long tokenId;
    private String itemUrl;
    private String itemTitle;
    private String itemDescription;
    private String authorName;
    private LocalDateTime createdAt;
    private String ownerAddress;
    private String onSaleYn;

    public static ItemsRes of(Items items) {
        ItemsRes res = new ItemsRes();
        res.setId(items.getId());
        res.setTokenId(items.getTokenId());
        res.setItemUrl(items.getItemUrl());
        res.setItemTitle(items.getItemTitle());
        res.setItemDescription(items.getItemDescription());
        res.setAuthorName(items.getAuthorName());
        res.setCreatedAt(items.getCreatedAt());
        res.setOwnerAddress(items.getOwnerAddress());
        res.setOnSaleYn(items.getOnSaleYn());

        return res;
    }
}
