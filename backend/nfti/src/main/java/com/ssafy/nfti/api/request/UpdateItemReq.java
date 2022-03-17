package com.ssafy.nfti.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateItemReq {
    Long itemId;
    Long tokenId;
    String ownerAddress;
}
