package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.CreateSaleReq;
import com.ssafy.nfti.api.response.SalesRes;
import com.ssafy.nfti.common.exception.enums.ExceptionEnum;
import com.ssafy.nfti.common.exception.response.ApiException;
import com.ssafy.nfti.db.entity.Items;
import com.ssafy.nfti.db.entity.Sales;
import com.ssafy.nfti.db.entity.User;
import com.ssafy.nfti.db.repository.ItemsRepository;
import com.ssafy.nfti.db.repository.SalesRepository;
import com.ssafy.nfti.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("salesService")
public class SalesServiceImpl implements SalesService {

    @Autowired
    SalesRepository salesRepository;

    @Autowired
    ItemsRepository itemsRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public SalesRes createSales(CreateSaleReq req) {
        Items item = itemsRepository.findByTokenId(req.getTokenId())
            .orElseThrow(() -> new ApiException(
                ExceptionEnum.NOT_FOUND_ITEM));
        User seller = userRepository.findByAddress(req.getSellerAddress())
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER));

        Sales sale = new Sales();
        sale.setSaleContractAddress(req.getSaleContractAddress());
        sale.setItem(item);
        sale.setSeller(seller);
        sale.setSaleYn(false);

        Sales resSale = salesRepository.save(sale);
        SalesRes res = SalesRes.of(resSale);

        // item의 onSaleYn 변경
        item.setOnSaleYn(true);
        itemsRepository.save(item);

        return res;
    }
}
