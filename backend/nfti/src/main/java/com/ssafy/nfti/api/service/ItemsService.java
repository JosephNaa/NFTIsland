package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.ItemsReq;
import com.ssafy.nfti.api.request.TransferItemReq;
import com.ssafy.nfti.api.response.ItemsCreateRes;
import com.ssafy.nfti.api.response.ItemsRes;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface ItemsService {
    ItemsCreateRes createItems(ItemsReq req);
    List<ItemsRes> listItems(Pageable pageable, String findBy, String search, Long communityId, Boolean onSaleYn);
    ItemsRes getItem(Long tokenId);
    ItemsRes transferItem(Long tokenId, TransferItemReq req);
    Boolean checkHasItem(String address, Long communityId);
}
