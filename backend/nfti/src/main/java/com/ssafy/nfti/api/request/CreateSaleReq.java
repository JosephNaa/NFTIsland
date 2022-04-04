package com.ssafy.nfti.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateSaleReq {
    String saleContractAddress;
    Long tokenId;
    String sellerAddress;
}
