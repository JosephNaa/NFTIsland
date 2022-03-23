package com.ssafy.nfti.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateItemReq {
    Long tokenId;
    String ownerAddress;
}
