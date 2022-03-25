package com.ssafy.nfti.api.response;

import com.ssafy.nfti.db.entity.Sales;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SalesRes {
    private String saleContractAddress;
    private Boolean saleYn;
    private Long saleId;
    private Long tokenId;
    private String cashContractAddress;
    private String sellerAddress;
    private String buyerAddress;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;

    public static SalesRes of(Sales sales) {
        SalesRes res = new SalesRes();
        res.setSaleId(sales.getId());
        res.setSaleContractAddress(sales.getSaleContractAddress());
        res.setSaleYn(sales.getSaleYn());
        res.setTokenId(sales.getTokenId());
        res.setCashContractAddress(sales.getCashContractAddress());
        res.setSellerAddress(sales.getSellerAddress());
        res.setBuyerAddress(sales.getBuyerAddress());
        res.setCreatedAt(sales.getCreatedAt());
        res.setCompletedAt(sales.getCompletedAt());

        return res;
    }
}