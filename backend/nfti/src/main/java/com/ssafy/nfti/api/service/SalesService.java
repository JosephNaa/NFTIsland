package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.CreateSaleReq;
import com.ssafy.nfti.api.request.PurchaseReq;
import com.ssafy.nfti.api.response.CommunityListRes;
import com.ssafy.nfti.api.response.SaleAndItemRes;
import com.ssafy.nfti.api.response.SalesRes;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface SalesService {

    SalesRes createSales(CreateSaleReq createSaleReq);
    List<CommunityListRes> listCommunitiesOnSale(Pageable pageable);
    List<SaleAndItemRes> listSalesOnCommunityId(Pageable pageable, Long communityId);
    SaleAndItemRes getSale(String saleContractAddress);
    SalesRes purchase(String saleContractAddress, PurchaseReq req);
}
