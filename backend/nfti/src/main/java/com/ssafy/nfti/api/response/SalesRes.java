package com.ssafy.nfti.api.response;

import com.ssafy.nfti.db.entity.Sales;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SalesRes {
    private String saleContractAddress;
    private Long tokenId;
    private String sellerAddress;
    private String buyerAddress;
    private Boolean saleYn;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;

    public static SalesRes of(Sales sales) {
        SalesRes res = new SalesRes();
        res.setSaleContractAddress(sales.getSaleContractAddress());
        res.setTokenId(sales.getItem().getTokenId());
        res.setSellerAddress(sales.getSeller().getAddress());
        if (sales.getBuyer() != null) {
            res.setBuyerAddress(sales.getBuyer().getAddress());
        }
        res.setSaleYn(sales.getSaleYn());
        res.setCreatedAt(sales.getCreatedAt());
        res.setCompletedAt(sales.getCompletedAt());

        return res;
    }
}