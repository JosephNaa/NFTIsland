package com.ssafy.nfti.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateSaleReq {
    Long tokenId;
    String sellerAddress;
    String salesContractAddress;
    String cashContractAddress;

}
