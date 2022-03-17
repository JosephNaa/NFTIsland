package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.SalesReq;
import com.ssafy.nfti.api.response.SalesRes;
import org.springframework.stereotype.Service;

@Service("salesService")
public class SalesServiceImpl implements SalesService{

    @Override
    public void createSales(SalesReq salesReq) {

    }

    @Override
    public SalesRes getSales(Long tokenId) {
        return null;
    }

    @Override
    public void completeSales(Long tokenId, SalesReq salesReq) {

    }

    @Override
    public void deleteSales(Long saleId) {

    }
}
