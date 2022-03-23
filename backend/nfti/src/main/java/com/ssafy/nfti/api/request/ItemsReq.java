package com.ssafy.nfti.api.request;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemsReq {
    Long tokenId;
    String ownerAddress;
    String image;
    String authorName;
    String itemTitle;
    String itemDescription;
    LocalDateTime createdAt;
}
