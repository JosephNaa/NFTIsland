package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.CreateSaleReq;
import com.ssafy.nfti.api.response.SalesRes;

public interface SalesService {

    SalesRes createSales(CreateSaleReq createSaleReq);

}
