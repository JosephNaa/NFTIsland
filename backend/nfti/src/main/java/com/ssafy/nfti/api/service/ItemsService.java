package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.ItemsReq;
import com.ssafy.nfti.api.response.ItemsCreateRes;

public interface ItemsService {
    ItemsCreateRes createItems(ItemsReq req);
}
