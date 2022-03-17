package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.SalesReq;
import com.ssafy.nfti.api.response.SalesRes;

public interface SalesService {

    void createSales(SalesReq salesReq);
    SalesRes getSales(Long tokenId);
    void completeSales(Long tokenId, SalesReq salesReq);
    void deleteSales(Long saleId);

}
