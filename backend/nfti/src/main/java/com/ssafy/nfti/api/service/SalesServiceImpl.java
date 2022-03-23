package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.CreateSaleReq;
import com.ssafy.nfti.api.request.SalesReq;
import com.ssafy.nfti.api.response.SalesRes;
import com.ssafy.nfti.db.entity.Sales;
import com.ssafy.nfti.db.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("salesService")
public class SalesServiceImpl implements SalesService{

    @Autowired
    SalesRepository salesRepository;

    @Override
    public void createSales(CreateSaleReq createSaleReq) {

        Sales newSale = new Sales();
        newSale.setTokenId(createSaleReq.getTokenId());
        newSale.setSellerAddress(createSaleReq.getSellerAddress());
        newSale.setSaleContractAddress(createSaleReq.getSalesContractAddress());
        newSale.setCashContractAddress(createSaleReq.getCashContractAddress());

        salesRepository.save(newSale);
    }

    @Override
    public SalesRes getSales(Long tokenId) {
        Sales sale = salesRepository.findByTokenId(tokenId);
        return SalesRes.of(sale);
    }

    @Override
    public void completeSales(Long tokenId, SalesReq salesReq) {
        Sales updateSale = salesRepository.findByTokenId(tokenId);
        updateSale.setBuyerAddress(salesReq.getBuyerAddress());

        salesRepository.save(updateSale);
    }

    @Override
    public void deleteSales(Long saleId) {
        Sales delSale = salesRepository.findBySaleId(saleId);
        salesRepository.delete(delSale);
    }
}
