package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.CancelSaleReq;
import com.ssafy.nfti.api.request.CreateSaleReq;
import com.ssafy.nfti.api.request.PurchaseReq;
import com.ssafy.nfti.api.response.GetSaleRes;
import com.ssafy.nfti.api.response.ListCommunitiesOnSaleRes;
import com.ssafy.nfti.api.response.ListSalesOnCommunityIdRes;
import com.ssafy.nfti.api.response.SalesRes;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface SalesService {

    SalesRes createSales(CreateSaleReq createSaleReq);
    String getSaleContractAddressByTokenId(Long tokenId);
    List<ListCommunitiesOnSaleRes> listCommunitiesOnSale(Pageable pageable);
    List<ListSalesOnCommunityIdRes> listSalesOnCommunityId(Pageable pageable, Long communityId);
    GetSaleRes getSale(String saleContractAddress);
    SalesRes purchase(String saleContractAddress, PurchaseReq req);
    void cancelSale(String saleContractAddress, CancelSaleReq req);

    Long getCommunityItemCount(Long communityId);
    Long getCommunityOwnerCount(Long communityId);
    Long getCommunityTradedCount(Long communityId);
}
